import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    "Content-Type": "application/json",
  })
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  getActors() {
    return this.http.get('/actors')
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  
  createActor(data: any) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id: string, data: any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id: string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  //lab tasks
  getMovies(){
    return this.http.get('/movies')
  }

  getMovie(id: any){
    return this.http.get(`/movies/${id}`)
  }

  addMovie(data: any){
    return this.http.post('/movies',data,httpOptions);
  }

  deleteMovie(aTitle: any){
    return this.http.delete(`/movie/${aTitle}`,httpOptions);
  }

  deleteBetweenYear(aYear1: any,aYear2: any ){
    return this.http.delete(`/movies/delmoviebetween/${aYear1}/${aYear2}`,httpOptions);
  }

  addActorToMovie(mId: any, actorId: any) {
    return this.http.post(`/movies/${mId}/actors/${actorId}`,httpOptions)
  }

}
