import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.html',
  styleUrls: ['./player.css'],
})
export class Player implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    //this.redirectToGeneralIfNoId();
  }

  redirectToGeneralIfNoId() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
    }
  }
}
