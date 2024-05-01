"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../atoms/Dialog/Dialog';
import { Button } from '../../atoms/Button/Button';

const Test = () => {

    return (
      <Dialog>
        <DialogTrigger className='inline-flex items-center justify-center h-10 px-8 py-2 text-sm font-semibold bg-smartorange text-primary-foreground hover:bg-smartorange/90 whitespace-nowrapring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
            Start Online Assessment
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
