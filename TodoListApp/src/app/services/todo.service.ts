import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'applications/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  todoUrl:string = 'https://my-json-server.typicode.com/mingyao23/jsonfile/todos';
  todoLimit:string = '?_Limit=5';

  constructor(private http:HttpClient) { }

  //Get the list of todo's in the remote json file.
  getTodoList():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todoUrl}${this.todoLimit}`);
  }

  //Get/Set enable todo item in the UI.
  toggleComplete(todo:Todo):Observable<any>{
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  //Delete a selected todo item in the UI.
  deleteTodo(todo:Todo):Observable<any>{
    const url = `${this.todoUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  //Add a todo item in the UI.
  addTodo(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todoUrl, todo, httpOptions);
  }

}
