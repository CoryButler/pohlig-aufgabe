import { Request, Response, NextFunction } from 'express';
import { devProcess, type User } from '../models/auth';
import { stati } from '../config/config';
import jwt from 'jsonwebtoken';

/*********************/
/* Private variables */
/*********************/

const _expirationTime: string = '10m';
const _msg_missing_field: string = 'Missing required field(s): ';
let _refreshTokens: Array<any> = [];

/*********************/
/* Private functions */
/*********************/

/**
 * Generate a JWT access token for a user.
 * 
 * @param {User} user The user object.
 * @returns {any} The generated access token.
 */
function generateAccessToken(user: User): any {
  return jwt.sign(user, devProcess.env.ACCESS_TOKEN_SECRET, { expiresIn: _expirationTime })
}

/**
 * Validate the required fields in the request body.
 * 
 * @param req The request object.
 * @param res The response object.
 * @returns True if all required fields are present, otherwise false.
 */
function validFields(req: Request, res: Response): boolean {
    const { username } = req.body;
    const missingFields: Array<string> = [];
    
    if (!username) missingFields.push('username');

    const isInvalidFields: boolean = missingFields.length > 0;

    if (isInvalidFields) {
        res.status(stati.UNPROCESSABLE_ENTITY).json({
            message: `${_msg_missing_field}${missingFields.join(', ')}`
        });
    }

    return !isInvalidFields;
}

/********************/
/* Public functions */
/********************/

// Create a token
export const createToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const refreshToken = req.body.token
    if (!refreshToken) {
        res.sendStatus(stati.UNAUTHORIZED);
        return;
    }

    if (!_refreshTokens.includes(refreshToken)) {
        res.sendStatus(stati.FORBIDDEN);
        return;
    }

    jwt.verify(refreshToken, devProcess.env.REFRESH_TOKEN_SECRET, (err, user: User) => {
        if (err) {
            res.sendStatus(stati.FORBIDDEN);
            return;
        }

        const accessToken = generateAccessToken({ name: user.name });

        // Respond with the created token
        res.status(stati.CREATED).json({ accessToken: accessToken });
    })
  }
  catch (e) {
    console.error(e);
    next(e);
  }
};

// Log user in
export const login = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Check for missing fields
    if (!validFields(req, res)) return;

    const user: User = { name: req.body.username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, devProcess.env.REFRESH_TOKEN_SECRET);

    _refreshTokens.push(refreshToken);

    // Respond with the tokens
    res.status(stati.OK).json({ accessToken: accessToken, refreshToken: refreshToken });
  }
  catch (e) {
    console.error(e);
    next(e);
  }
};

// Log user out
export const logout = (req: Request, res: Response, next: NextFunction): void => {
  try {
    _refreshTokens = _refreshTokens.filter(t => t !== req.body.token);
    res.sendStatus(stati.NO_CONTENT);
  }
  catch (e) {
    console.error(e);
    next(e);
  }
};