import { BlocksService } from './blocks.service';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

let mockBlocksService: any;
describe('AppComponent', () => {
  let fakeBlocks = [
    'NccpYPDNQEfxkCIcGgZyD0YzjSDlhdUZvAfSxkVsPGN8aSNHT5BljrFY7aHgKfviYgeX3KhMzAGlh3BOwLPTlYS0MyiLmAI1W8la',
    '8PwOVP8wkaHW6EuxlLghzNcMfWJpsKomPfr2QEEsIVkZj2SaZEzFYfuL34dHPEdj4nuqUH7A7AeN8ZHOOq8MPh9Zw20EwC1jh8X3',
    'yqHMXjVSpEvI1Z1SuDtJOGBQqGR4iTq6ihihQiMvXSm7vsgvDN946rPI6QGGLgwZ3anh2HPgI4oLTKSnjftFuchi4BGTe4brkExU',
    'G4aamYzyI3nrUZUyjbuxEvV51q8QAbvvFwZVDjg6t1KkHmRYsg8xFuUCLrmycWcmFijymHj1dW2vdEBSMeSPgnpuPOVKiOiBG6Qp',
    'EApJQgT6ivJKSRwTeELHYWMJEHC0O8NktFeuRLiyIAdd1yxzAlrnjNlun9CYt5wHRNCngeMvFQIKs7WapaFyjzzDS3zLvxnioAeE',
    'yHY5bIIrRu5xxkYsBUXU9T4ZJ6oz4SMryZeMvTBiwvozJKlfhwK5CpFRiTnslnWjSPWapjUwQLp6dIJdDo4JuCGzxPU01YXbXRkK',
    'rvyVSfdaHiIjk7Drk2265eHCYCAkYlRtDtQ1aprQuVoMEYcdHiYvLIsFzeyifJSq3VE5TSCP6znGdrif0hi3sVtjoqIvfz11JiYE',
    'tVJCqTloVrjuqlZqqNqj1xZspxCHOMrt38bLJcELsjhnvWThi5GxOazbYvfpzHHgQxFmtwqecfxuMgvWjgO4OOKwJyeQUjslstCS',
    'MKYcOvNTyVlhAjXJwkPfEgSyL4ao9CyWmZV4DNZ8Nay0Dng2jdUv0Kh7kgiUi8olrKh9g5JekIDWZv7RXNqCUaWAJSSBk68rWcBG',
  ];

  let fakeOkResponse = {
    message: true,
  };

  let fakeToken = 'a41c1747-9613-4ab8-b5cf-5bf8b37ed73b';

  beforeEach(async () => {
    mockBlocksService = jasmine.createSpyObj([
      'getToken',
      'getBlock',
      'postCheck',
      'buildPayload',
    ]);
    mockBlocksService.getToken.and.returnValue(of(fakeToken));
    mockBlocksService.postCheck.and.returnValue(of(fakeOkResponse));
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: BlocksService, useValue: mockBlocksService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('Should check blocks async', function(done) {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    let response: string[] = [];

    app.check(fakeBlocks, fakeToken).then((res) => {
      response = res;
      expect(response).toEqual(fakeBlocks);
      done();
    });

  });
});
