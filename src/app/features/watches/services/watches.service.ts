import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Watch } from '../models/watch.model';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '@shared/services/utils.service';

const baseUrl = environment.BASE_URL;

interface UpdateProps{
  formData: FormData;
  id: number;
  folder?:string;
}

@Injectable({ providedIn: 'root' })
export class WatchesService {
  http = inject(HttpClient);
  folder:string = 'Products/Watches';

  utilsService = inject(UtilsService);

  getAllWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${baseUrl}/watches/`);
  }

  getWatchByParam(param: string): Observable<Watch[]>{
    return this.http.get<Watch[]>(`${baseUrl}/watches/search`,
      {
        params: {param}
      }
    );
  }

  getWatchById(id: number): Observable<Watch>{
    return this.http.get<Watch>(`${baseUrl}/watches/${id}`);
  }

  createWatch(formData: FormData, folder: string = 'Products/Watches'): Observable<Watch>{
    return this.http.post<Watch>(`${baseUrl}/watches/`, formData,{
      params: {folder}
    });
  }

  updateWatch(props: UpdateProps):Observable<Watch>{

    const {formData, id, folder='Products/Watches'} = props;

    return this.http.put<Watch>(`${baseUrl}/watches/${id}`, formData,
      {
        params: {folder}
      }
    );
  }

  deleteWatch(id: number, images: string[]): Observable<Watch>{
    const publicImageIds = this.utilsService.getPublicProductIds(images);
    return this.http.delete<Watch>(`${baseUrl}/watches/${id}`, {
      body: {publicImageIds}
    })
  }
}
