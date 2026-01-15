import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { VehicleEntry } from '../app/models/vehicle-entry.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private API_URL = 'http://localhost:3000/logs';

  private entriesSubject = new BehaviorSubject<VehicleEntry[]>([]);
  entries$ = this.entriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Load entries from backend */
  fetchEntries(): Observable<VehicleEntry[]> {
    return this.http.get<any[]>(this.API_URL).pipe(
      tap((entries) => {
        console.log('Raw entries from backend:', entries);
        const normalized: VehicleEntry[] = entries.map((e) => {
          const normalizedEntry = {
            ...e,
            _id: e._id || (e.id ? String(e.id) : undefined),
            tollFee: Number(String(e.tollFee).replace('$', '')),
          };
          console.log('Normalized entry:', normalizedEntry);
          return normalizedEntry;
        });
        this.entriesSubject.next(normalized);
      })
    );
  }

  /** Add new entry */
  addEntry(entry: VehicleEntry): Observable<VehicleEntry> {
    console.log('POST payload:', entry);

    return this.http.post<VehicleEntry>(this.API_URL, entry).pipe(
      tap((created) => {
        const current = this.entriesSubject.value;
        const normalized: VehicleEntry = {
          ...created,
          _id: created._id || (created.id ? String(created.id) : undefined),
          tollFee: Number(String(created.tollFee).replace('$', '')),
        };
        this.entriesSubject.next([normalized, ...current]);
      })
    );
  }

  /** Update vehicle status (flag as violation, paid, etc.) */
  updateStatus(id: string, status: string): Observable<VehicleEntry> {
    console.log(`Updating status for ID: ${id}, Status: ${status}`);
    console.log(`API URL: ${this.API_URL}/${id}/status`);
    
    return this.http
      .patch<VehicleEntry>(`${this.API_URL}/${id}/status`, { status })
      .pipe(
        tap((updated) => {
          console.log('Status updated successfully:', updated);
          const current = this.entriesSubject.value;
          const updatedList: VehicleEntry[] = current.map((entry) => {
            const entryId = entry._id || (entry.id ? String(entry.id) : undefined);
            if (entryId === id) {
              return {
                ...updated,
                _id: updated._id || (updated.id ? String(updated.id) : undefined),
                tollFee: Number(String(updated.tollFee).replace('$', '')),
              };
            }
            return entry;
          });
          this.entriesSubject.next(updatedList);
        })
      );
  }
}
