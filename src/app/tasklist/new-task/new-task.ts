import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { new_task_interface } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})

export class NewTask {
  @Output() cancel = new EventEmitter<void>()
  @Output() create = new EventEmitter<new_task_interface>()

  enteredTitle = ''
  enteredDate = ''

  onCancel(){
    this.cancel.emit()
  }

  onSubmitForm(){
    this.create.emit({
      title : this.enteredTitle ,
      deadline : this.enteredDate ,
    })
  }
}
