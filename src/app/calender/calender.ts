import { Component, computed, input, InputSignal, signal, Signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { NgClass } from '@angular/common';
import { Mettings } from './meetings.interface';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calender',
  imports: [NgClass],
  templateUrl: './calender.html',
  styleUrl: './calender.css',
})
export class Calender {
  @ViewChild('grid') gridRef!: ElementRef<HTMLElement>;

  meetings : InputSignal<Mettings> = input.required()
  today : Signal<DateTime> = signal(DateTime.local())
  firstDayOfActiveMonth : WritableSignal<DateTime > = signal(this.today().startOf('month'))
  activeDay : WritableSignal<DateTime | null> = signal(null)
  weekDays : Signal<string[]> = signal(Info.weekdays('short'))
  daysOfMonth : Signal<DateTime[]> = computed(()=>{
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week') ,
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    )
      .splitBy({day: 1})
      .map((d)=> {
        if (d.start === null){
          throw new Error('wrong dates')
        }
        return d.start
      })
  })

  DATE_MED = DateTime.DATE_MED
  activeDayMeetings : Signal<string[]> = computed(()=>{
    const activeDay = this.activeDay()
    if (activeDay === null) {
      return []
    }
    const activeDayISO = activeDay.toISODate()
    if (!activeDayISO){
      return []
    }
    return this.meetings()[activeDayISO] ?? []
  })

  goTOPreviousMont(): void{
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({month:1}),
    )
  }

  goTONextMont(): void{
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({month:1}),
    )
  }

  goTOToday(): void{
    this.firstDayOfActiveMonth.set(
      this.today().startOf('month')
    )
  }

  jumpToToday() : void {

    const now = DateTime.local();                   
    this.activeDay.set(now.startOf('day'));         
    this.firstDayOfActiveMonth.set(now.startOf('month'));

    setTimeout(() => {
      const el = this.gridRef?.nativeElement
        ?.querySelector('.calender-grid-cell.is-today') as HTMLElement | null;
      el?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }, 0);
    
  }
}
