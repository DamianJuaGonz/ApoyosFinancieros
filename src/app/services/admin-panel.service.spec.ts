import { TestBed } from '@angular/core/testing';

import { adminpanelservice } from './admin-panel.service';

describe('AdminPanelService', () => {
  let service: adminpanelservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(adminpanelservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
