import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from '../Services/todo.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  today: any = new Date();
  todo: any = [];
  done: any = []
  constructor(private toastr: ToastrService, private _router: Router, public todoService: TodoService, private cookieService: CookieService,) {
    this.getAllTask()
  }
  message: string = ''
  ngOnInit(): void {
  }


  drop(event: CdkDragDrop<any[]>) {
    let finalData: any = []
    if (event.previousContainer === event.container) {
      finalData = [...event.container.data]
      const tmp = finalData[event.previousIndex]
      finalData[event.previousIndex] = finalData[event.currentIndex]
      finalData[event.currentIndex] = tmp
      console.log("finalData", finalData)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.editTaskFormSubmit(finalData)
      return
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let todoArray = []
      let doneArray = []
      console.log(event);
      let dropedStatus: any = ''
      let eventContainer: any = event.container
      console.log("eventContainer", eventContainer)
      console.log("event.currentIndex", event.currentIndex)
      dropedStatus = eventContainer.data[event.currentIndex].status
      if (dropedStatus === "todo") {
        todoArray = event.previousContainer.data
        doneArray = event.container.data
        doneArray = doneArray.map((e: any) => {
          e.status = "done"
          return e
        })
        finalData = [...todoArray, ...doneArray]
      }
      else {
        todoArray = event.container.data
        doneArray = event.previousContainer.data
        todoArray = todoArray.map((e: any) => {
          e.status = "todo"
          return e
        })
        finalData = [...todoArray, ...doneArray]
      }
    }


    this.editTaskFormSubmit(finalData)
    finalData = []
  }

  // document.getElementById('dt').max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

  TaskFormGroup = new FormGroup({
    name: new FormControl(),
    deadline: new FormControl(),
  })

  name: Boolean = false
  deadline: Boolean = false

  taskFormSubmit() {
    let data = {
      name: this.TaskFormGroup.value.name,
      deadline: this.TaskFormGroup.value.deadline
    }
    if (this.TaskFormGroup.value.name == "" || this.TaskFormGroup.value.name == null) {
      this.name = true;
      return false;
    }
    else if (this.TaskFormGroup.value.deadline == "" || this.TaskFormGroup.value.deadline == null) {
      this.deadline = true;
      return false;
    }
    else {
      this.todoService.createTask(data).subscribe(res => {
        let result: any = res
        if (result["status"] !== 200) {
          this.toastr.error(result["message"], 'error');
          return;
        }

        this.TaskFormGroup.reset();
        this.name = false;
        this.deadline = false;
        this.getAllTask()
        this.toastr.success(result["message"], 'success');


      }, err => {
        console.log(err)
        if (err["error"]["message"].startsWith("celebrate")) {
          this.toastr.error(err["error"]["validation"]["body"]["message"], 'error');
          return
        }
        this.toastr.error(err["error"]["message"], 'error');

      })
    }
    return
  }

  editTaskFormSubmit(tasks: any) {
    let data = {
      tasks
    }
    this.todoService.editTask(tasks).subscribe(res => {
      let result: any = res
      if (result["status"] !== 200) {
        this.toastr.error(result["message"], 'error');
        return;
      }
      // this.TaskFormGroup.reset();
      // this.name = false;
      // this.deadline = false;
      // this.getAllTask()
      this.toastr.success(result["message"], 'success');


    }, err => {
      console.log(err)
      if (err["error"]["message"].startsWith("celebrate")) {
        this.toastr.error(err["error"]["validation"]["body"]["message"], 'error');
        return
      }
      this.toastr.error(err["error"]["message"], 'error');

    })

    return
  }

  getAllTask() {
    this.todo = []
    this.done = []
    this.todoService.getAllTask().subscribe(res => {
      console.log(res)
      let result: any = res
      for (let task of result.tasks) {
        if (task.status === "todo") {
          this.todo.push(task)
        }
        else {
          this.done.push(task)
        }
      }

    }, err => {
      this.toastr.error('Something Went Wrong!', 'error');
    })

  }

  logout() {
    this.todoService.logout().subscribe(res => {
      console.log(res)
      let result: any = res
      this.cookieService.delete("todo_token")
      this.toastr.success(result["message"], 'success');
      this._router.navigate(['login'])


    }, err => {
      this.toastr.error(err['message'], 'error');
    })

  }

}
