import { Component } from '@angular/core';
import { Task } from './task/task.model';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { MatDialog } from '@angular/material/dialog';
import {
  TaskDialogComponent,
  TaskDialogResult,
} from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'kanbanboard-clone';
  public data: Object[] = [
    {
      Id: 1,
      Status: 'Open',
      Summary: 'Analyze the new requirements gathered from the customer.',
      Type: 'Story',
      Priority: 'Low',
      Tags: 'Analyze,Customer',
      Estimate: 3.5,
      Assignee: 'Nancy Davloio',
      RankId: 1,
    },
    {
      Id: 2,
      Status: 'InProgress',
      Summary: 'Fix the issues reported in the IE browser.',
      Type: 'Bug',
      Priority: 'Release Breaker',
      Tags: 'IE',
      Estimate: 2.5,
      Assignee: 'Janet Leverling',
      RankId: 2,
    },
    {
      Id: 3,
      Status: 'Testing',
      Summary: 'Fix the issues reported by the customer.',
      Type: 'Bug',
      Priority: 'Low',
      Tags: 'Customer',
      Estimate: '3.5',
      Assignee: 'Steven walker',
      RankId: 1,
    },
    {
      Id: 4,
      Status: 'Close',
      Summary:
        'Arrange a web meeting with the customer to get the login page requirements.',
      Type: 'Others',
      Priority: 'Low',
      Tags: 'Meeting',
      Estimate: 2,
      Assignee: 'Michael Suyama',
      RankId: 1,
    },
    {
      Id: 5,
      Status: 'Validate',
      Summary: 'Validate new requirements',
      Type: 'Improvement',
      Priority: 'Low',
      Tags: 'Validation',
      Estimate: 1.5,
      Assignee: 'Robert King',
      RankId: 1,
    },
  ];

  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
    },
  ];

  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private dialog: MatDialog) {}

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });

    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      console.log('result -> ', result);

      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    const item = event.previousContainer.data[event.previousIndex];
    console.log('item -> ', item);

    console.log(event.container.data)

    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
      });
  }
}
