#!/usr/bin/env node
import launchUIBridge from './core/uiBridge';

launchUIBridge(!!(process.env.NODE_ENV && process.env.NODE_ENV === 'development'));