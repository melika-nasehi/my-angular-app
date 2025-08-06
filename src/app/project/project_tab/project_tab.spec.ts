import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTab } from './project_tab';

describe('Project', () => {
  let component: ProjectTab;
  let fixture: ComponentFixture<ProjectTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
