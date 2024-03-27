import jwt from 'jsonwebtoken';
import secret from '../config/secret';
import SchedulerToken from '../models/scheduler-token/scheduler-token-model';
import { logError, logInfo } from '../common/logger';
import { getClientIp } from '../common/common';

function autoVerifyToken(req, res, next) {
  logInfo(req.headers.token, "autoVerifyToken token");
  const token = req.headers.token;
  const ip = getClientIp(req);
  logInfo(ip, "autoVerifyToken ip");

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  SchedulerToken.find({ token, ip })
    .then((result1) => {
      logInfo(result1.length, "autoVerifyToken result");
      if (result1.length === 0) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      } else {
        next();
      }
    })
    .catch((err) => {
      logError(err, "autoVerifyToken err ");
      res.json({ err });
    });
}

export default autoVerifyToken;
