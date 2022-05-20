import { Component, NgModule, VERSION, AfterViewInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { formatDate, getLocaleDateFormat, FormatWidth } from "@angular/common";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  private _users: User[];

  name: string;
  family: string;
  itemNum: number;
  birthday: LocalDate;
  editingIndex: number;
  deleteId: number;
  currentDate = formatDate(new Date(), "yyyy-MM-dd", "en");

  constructor(private modalService: NgbModal) {
    this._users = [
      new User("Ali", "Delshad", 1),
      new User("Hamid", "Sadeghi", 2),
      new User("Amir", "Olfat", 3),
      new User("Keyvan", "Nasr", 4)
    ];
  }

  get users(): User[] {
    return this._users;
  }

  openDeletePopup(index: number) {
    this.deleteId = index;
    document.getElementById("deletePopup").style.display = "block";
  }

  setEditUser(index: number): void {
    if (document.getElementById("entryForm").style.display != "block")
      document.getElementById("popup").style.display = "block";
    this.editingIndex = index;
    this.name = this._users[index].name;
    this.family = this._users[index].family;
    this.itemNum = this._users[index].itemNum;
    this.birthday = this._users[index].birthday;
  }

  delete(event) {
    let deleteResponse = event.target.value;
    if (deleteResponse == "yes") {
      this._users.splice(this.deleteId, 1);
    }
    document.getElementById("deletePopup").style.display = "none";
  }

  openEditPopup(event) {
    let response = event.target.value;
    document.getElementById("popup").style.display = "none";
    if (response != "no")
      document.getElementById("entryForm").style.display = "block";
  }

  edit(): void {
    this._users[this.editingIndex] = new User(
      this.name,
      this.family,
      this.itemNum,
      this.birthday
    );
    this.editingIndex = undefined;
    this.name = "";
    this.family = "";
    this.itemNum = null;
    this.birthday = null;
    document.getElementById("entryForm").style.display = "none";
  }

  add(): void {
    document.getElementById("entryForm").style.display = "block";
    if (this.name && this.family && this.itemNum && this.birthday) {
      this._users.push(
        new User(this.name, this.family, this.itemNum, this.birthday)
      );
      this.name = "";
      this.family = "";
      this.itemNum = null;
      this.birthday = null;
      document.getElementById("entryForm").style.display = "none";
      document.getElementById("alert").style.display = "none";
    }
  }

  cancel(): void {
    document.getElementById("entryForm").style.display = "none";
  }
}

export class AppModule {}

export class User {
  private _name: string;
  private _family: string;
  private _itemNum: number;
  private _birthday: LocalDate;

  constructor(
    name: string,
    family: string,
    itemNum?: number,
    birthday?: LocalDate
  ) {
    this._name = name;
    this._family = family;
    this._itemNum = itemNum;
    this._birthday = birthday;
  }

  get name(): string {
    return this._name;
  }

  get family(): string {
    return this._family;
  }

  get itemNum(): number {
    return this._itemNum;
  }

  get birthday(): LocalDate {
    return this._birthday;
  }
}

export interface LocalDate {
  day: number;
  month: number;
  year: number;
}
