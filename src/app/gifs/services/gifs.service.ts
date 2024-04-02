import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';




@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '2A919tMly0GYkELQdG9cmX4KyBLlrINr';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _tagsHistory: string[] =[];

  public gifList: Gif[] = [];

  constructor( private http: HttpClient ) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }
  
  async searchTag( tag:string ){
    if ( tag.length === 0 ) return;
    this.organizeHistory( tag );
    this._tagsHistory.unshift( tag );
    this._tagsHistory= this._tagsHistory.slice(0,10)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data
      })
    
  }

  organizeHistory( tag: string ){
    tag = tag.toLowerCase();
    this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag)
  }

}
