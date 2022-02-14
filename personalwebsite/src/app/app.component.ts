import { Component } from '@angular/core';
import { faItchIo } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMenuCollapsed = true;
  title = 'personalwebsite';
  itchio = faItchIo;
  linkedin = faLinkedin;
  github = faGithub;
}

