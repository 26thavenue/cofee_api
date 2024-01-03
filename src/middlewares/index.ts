import { Request, Response, NextFunction } from 'express';

// export class ErrorHandler{
//     errorMessage: string;
//     statusCode: number

//     constructor(statusCode:number, errorMessage:string){
//         this.errorMessage = errorMessage;
//         this.statusCode = statusCode;
//     }

//     public ErrorHandler(errorMessage:string){
//         return errorMessage
//     }


// }

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  const{isAdmin} = req.body
  if (isAdmin) {
    // Assuming req.user.isAdmin is a boolean indicating admin status
    next();
  } else {
    res.sendStatus(403).json("You don't have permission to access this")
  }
}

