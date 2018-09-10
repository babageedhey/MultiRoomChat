import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable()
export class ChatService {

  private socket = io('http://localhost:5000');

  constructor() { }

  //Join room function to allow user join any room.
  joinRoom(data){
    this.socket.emit('join', data)
  }

  //Leave room Function button
  leaveRoom(data){
      this.socket.emit('leave', data)
  }

  //Send messages function button.
  sendMessage(data){
      this.socket.emit('message', data)
  }

  //Alert others in the room about new User
  newUserJoined()
    {
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    Userleave(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('User Left', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;

    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;

    }

    

}
