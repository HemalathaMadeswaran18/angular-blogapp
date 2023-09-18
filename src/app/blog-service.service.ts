import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EBlog } from './eblog';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  constructor(private http:HttpClient) { }

  GetBlogs():Observable<EBlog[]>{
    return this.http.get<EBlog[]>('http://localhost:3000/blogs');
  }



//   //get a single contact 
//   GetContact(id:String) :Observable<IContact>{
//     return this.http.get(`http://localhost:3000/contacts/${id}`);
// }


//add a new contact 
AddBlog(blog:EBlog){

  return this.http.post('http://localhost:3000/blogs',blog);
}

//delet contact 
 DeletEBlog(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/blogs/${id}`);
  }


}
