import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RunnerService {
  activeScreen$ = new BehaviorSubject<string | null>(null);
}