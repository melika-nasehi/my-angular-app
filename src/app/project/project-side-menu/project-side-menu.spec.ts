import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSideMenu } from './project-side-menu';

describe('ProjectSideMenu', () => {
  let component: ProjectSideMenu;
  let fixture: ComponentFixture<ProjectSideMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSideMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSideMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
