"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../atoms/Dialog/Dialog';
import { Button } from '../../atoms/Button/Button';

const Test = () => {

    return (
      <Dialog>
        <DialogTrigger>
          <Button size="invite">
              Start Online Assessment 
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}

export default Test;
