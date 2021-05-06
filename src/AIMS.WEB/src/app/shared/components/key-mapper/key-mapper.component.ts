import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-key-mapper',
  templateUrl: './key-mapper.component.html',
  styleUrls: ['./key-mapper.component.scss']
})
export class KeyMapperComponent implements OnInit {
  @Output() code = new EventEmitter();
  readonly keystrokeDelay = 1000;
  readonly charList = new Set('0123456789'.match(/.{1}/g));
  bufferSubject = new Subject();
  buffer: string;
  lastKeyTime: number;

  ngOnInit() {
    this.buffer = '';
    this.lastKeyTime = Date.now();

    this.bufferSubject.pipe(
      debounceTime(this.keystrokeDelay),
      distinctUntilChanged()
    ).subscribe(_ => {
      console.log('bufferSubject outputCode');
      this.outputCode();
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.isOutputCode(event.keyCode);
    const key = this.keyValidation(event);
    if (!key) {
      return;
    }
    this.setBuffByTime(key);
  }

  private keyValidation(event: KeyboardEvent) {
    const key = event.key;
    const isInput = (event.target as HTMLInputElement).value !== undefined;
    const isNotInCharList = !this.charList.has(key);
    // console.log('handleKeyboardEvent', isInput );
    if (isInput || isNotInCharList) {
      return;
    }
    return key;
  }

  private setBuffByTime(key: string) {
    const currentTime = Date.now();
    if (currentTime - this.lastKeyTime > this.keystrokeDelay) {
      this.buffer = key;
    } else {
      this.buffer = `${this.buffer}${key}`;
    }
    this.bufferSubject.next(this.buffer);
    this.lastKeyTime = currentTime;
  }

  private isOutputCode(keyCode: number) {
    const isEnter = keyCode === 13;
    if (!isEnter) {
      return;
    }
    this.outputCode();
  }

  private outputCode() {
    console.log('KeyMapperComponent', this.buffer);
    this.code.emit(this.buffer);
    this.buffer = '';
  }
}
