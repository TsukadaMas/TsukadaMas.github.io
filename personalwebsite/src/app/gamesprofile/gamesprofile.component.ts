import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface Game {
  title: string;
  description: string;
  highLevelDescription: string;
  MediaURL: string;
  VideoURL: string;
  link: string;
}

@Component({
  selector: 'app-gamesprofile',
  templateUrl: './gamesprofile.component.html',
  styleUrls: ['./gamesprofile.component.css']
})

export class GamesprofileComponent implements OnInit {
   selectedGame: Game | null = null;
    modalInstance: any;

  games: Game[] = [
    {
      title: 'Kalios',
      description: "A Procedural generated 2d platform game that has you controlling a character that can dash, teleport and throw daggers at specific orbs to get to new places, This game was created with 2 other developers using Unity.",
      highLevelDescription: "I was responsible for implementing features such as the procedural generation as well as the teleport and dagger ability, The Level Design was a team effort with every member contributing to creating designs",
      MediaURL: '../../assets/images/kalios.png',
      VideoURL: "https://www.youtube.com/embed/-mXUCibYFoo?si=jF7_n5KdjMc9Vaz6",
      link: 'https://4nz.itch.io/kalios'
    },
    {
      title: 'Mine Evolution',
      description: "This game was created in partnership with <a href='https://www.cim.org/'>CIM</a> and <a href='https://www.sciencenorth.ca/'>Science North</a> to interest student and famlies in the mining industry</p>",
      highLevelDescription: "I was brought on during the middle of development of this game, I was mostly responsible for developing the UI as well as the mini-games and underground mine logic, as a result of the teams efforts we managing to win a silver award from the 'Serious Games Awards', I currently maintain the project and try to fix any bugs that may appear or resolve any issue with the game to comply to store standards ",
      MediaURL: '../../assets/images/mine_evo.png',
      VideoURL: "https://www.youtube.com/embed/ckTiKW8J584?si=OsGa1wpXlXVAr7eR",
      link: 'https://mineevolution.ca/'
    },
    {
      title: 'Swarm 2',
      description: "A fast-paced VR arcade shooter where players use grappling hooks to swing through arenas and fight off swarms of alien enemies. I was brought on as a contracted developer to implement the rocket jump mechanic",
      highLevelDescription: "I was brought on as a contracted developer to work on game mechanic's, as well as UI, I was responsible for the developing the feature commonly know as 'Rocket Jump' where the kickback from your weapon would propel you in the opposite direction, allowing you to get a needed boost or cancel a force",
      MediaURL: '../../assets/images/swarm.png',
      VideoURL: 'https://www.youtube.com/embed/-152LOXaM-g?si=xFtFSnkDwlZL5hlV',
      link: 'https://www.meta.com/experiences/swarm-2/5791805387504648/?srsltid=AfmBOopTYTX-VPVbbTvMvtD6Di428vMFnwIoahqnO_JqAyvEow9k9tzm'
    },
    {
      title: 'MLB VR',
      description: "an officially licensed, immersive VR game where players hit home runs in all 30 MLB ballparks. Players act as batters in a rapid-fire Home Run Derby, trying to hit as many home runs as possible.",
      highLevelDescription: "This is a project we are currently developing, I'm responsible for modifing the project for centralized arcade use",
      MediaURL: '../../assets/images/mlbvr.png', 
      VideoURL: 'https://www.youtube.com/embed/3xRu0QcKVNQ',
      link: ''
    },
    {
      title: 'Freakout',
      description: "A rhythem VR game that features dance gates (a pose that the user needs to match) and uniquely modeled enviroments, that pay hommage to the 80's",
      highLevelDescription: "A project that is currently being redeveloped, I'm currently the technical lead on the project",
      MediaURL:  '../../assets/images/Freakout.png',
      VideoURL: 'https://www.youtube.com/embed/dkD6g0cdOh0?si=6ZPnxWdKooseuZZF',
      link: ''
    },
    {
      title: "Sear",
      description: "Created for the “Chill Jam” game jam, this project was built around the central theme “Light the Dark.” The concept challenged developers to interpret darkness not just as the absence of light, but as a mood, a mechanic, and a narrative force.",
      highLevelDescription: "A game jam that me and my friends participated in, I was responsible for the movement of the character as well as the lighting mechanic and particle system",
      MediaURL: "https://img.itch.zone/aW1nLzExMDY5OTc0LmpwZw==/original/EZ47TZ.jpg",
      VideoURL: "https://www.youtube.com/embed/mQPxOKIMGmc?si=FwEiWj8qmCSx_B8W",
      link: "https://4nz.itch.io/sear"
    }
    //{
    //  title: 'The Boy and His Dog',
    //  description: "A 2d game about a boy and his dog going on a adventure to vanquish a accident evil, fight enemies, solve puzzles and uncover the story of what happened<",
   //   MediaURL: '../../assets/images/tbahd.png',
   //   link: ''
   // }
  ];

  constructor(private modalService: NgbModal, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
  }


  openModal(game: Game, content: any) {
    this.selectedGame = game;
    this.modalService.open(content, { size: 'lg' });
  }

   getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
