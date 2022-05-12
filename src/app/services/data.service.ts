import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Firestore, collectionData, doc, addDoc, docData, collection, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore, private database: Database, private auth: AngularFireAuth, public firestore2: AngularFirestore,) { }

  // get the data
  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  // for specific data
  getNoteById(id): Observable<Note>{
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField : 'id'}) as Observable<Note>;
  }

  // add data to firestore
  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note)
  }

  // delete data from firestore
  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  // update data
  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, {title:note.title, text:note.text});
  }


  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data) {
    return this.firestore2.collection("users").doc(data.uid).set(data);
  }
  getDetails(data) {
    return this.firestore2.collection("users").doc(data.uid).valueChanges();
  }

  getUsers(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'users');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  // for specific data
  getUserById(id): Observable<Note>{
    const noteDocRef = doc(this.firestore, `users/${id}`);
    return docData(noteDocRef, { idField : 'id'}) as Observable<Note>;
  }
}
