import { BlocksService } from './blocks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'check-string-challenge';
  token: string = '';
  initialBlocks: string[] = [];
  finalResult: string[] = [];
  subscriptions: any[] = [];
  constructor(private blocksService: BlocksService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.blocksService
        .getToken()
        .pipe(
          switchMap((resp: any) => {
            this.token = resp.token;
            if (this.token) {
              return this.blocksService.getBlock(this.token).pipe(
                switchMap((data: any) => {
                  this.initialBlocks = data.data;
                  return this.check(this.initialBlocks, this.token).then(
                    (orderedBlocks) => {
                      const payload = this.blocksService.buildPayload(
                        orderedBlocks,
                        true
                      );
                      this.blocksService
                        .postCheck(payload, this.token)
                        .then((result) => {
                          this.finalResult = orderedBlocks;
                        });
                    }
                  );
                })
              );
            } else {
              return EMPTY;
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((a) => a.unsubscribe());
  }

  public async check(blocks: Array<string>, token: string) {
    let orderedBlocks = [blocks[0]];
    let avoidBlocks: string[] = [];

    while (orderedBlocks.length < blocks.length) {
      let lastBlock = orderedBlocks[orderedBlocks.length - 1];
      let nextBlock = blocks.find(
        (block) =>
          block !== lastBlock &&
          !orderedBlocks.includes(block) &&
          !avoidBlocks.includes(block)
      );

      if (nextBlock) {
        let blocksToCheck = [lastBlock, nextBlock];
        let payload = this.blocksService.buildPayload(blocksToCheck, false);
        let result = await this.blocksService.postCheck(payload, token);

        if (result && nextBlock) {
          orderedBlocks.push(nextBlock);
          avoidBlocks = [];
        } else if (nextBlock) {
          avoidBlocks.push(nextBlock);
        }
      }
    }

    return orderedBlocks;
  }
}
