import fs from 'fs';
import gulp from 'gulp';
import sharp from 'sharp';
import pngquant from 'imagemin-pngquant';
import newer from 'gulp-newer';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import { config } from '../config';


