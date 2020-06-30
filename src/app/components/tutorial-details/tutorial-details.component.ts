import { Component, OnInit } from '@angular/core';
import {TutorialService} from 'src/app/services/tutorial.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  currentStoryPointEntry = null;
  message = '';
  submitted= false;

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id) {
    this.tutorialService.get(id)
        .subscribe(
          data => {
            this.currentStoryPointEntry = data;
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
  }

  updateTutorial() {
    
    this.tutorialService.update(this.route.snapshot.paramMap.get('id'),
                                this.currentStoryPointEntry)
                        .subscribe(
                          response => {
                            console.log(response);
                            this.submitted=true;
                          },
                          error => {
                            console.log(error);
                          });         
  }

  deleteTutorial() {
    this.tutorialService.delete(this.route.snapshot.paramMap.get('id'))
                        .subscribe(
                          response => {
                            console.log(response);
                            this.submitted=true;
                          },
                          error => {
                            console.log(error);
                          });   

  }

}
