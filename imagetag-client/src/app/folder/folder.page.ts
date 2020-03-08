import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public buttonEvent = new Subject<'zoomIn'|'zoomOut'>();
  public imageName: string = 'DSC_0280.JPG';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.imageName = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
