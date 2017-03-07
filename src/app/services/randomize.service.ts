/*jshint bitwise: false*/

import {Injectable} from '@angular/core';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable()
export class RandomizeService {
  private N: number;
  private M: number;
  private MATRIX_A: number;
  private LOWER_MASK: number;
  private UPPER_MASK: number;
  private mt: Array<number>;
  private mti: number;

  constructor(seed: number) {
    if (seed === undefined) {
      seed = new Date().getTime();
    }
    /* Period parameters */
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;
    /* constant vector a */
    this.UPPER_MASK = 0x80000000;
    /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff;
    /* least significant r bits */

    this.mt = new Array(this.N);
    /* the array for the state vector */
    this.mti = this.N + 1;
    /* mti==N+1 means mt[N] is not initialized */

    this.init_genrand(seed);
  }

  init_genrand(seed: number) {
    this.mt[0] = seed >>> 0;
    for (this.mti = 1; this.mti < this.N; this.mti++) {
      const s: number = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
        + this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  init_by_array(init_key: number, key_length: number) {
    this.init_genrand(19650218);
    let i = 1;
    let j = 0;
    let k: number = (this.N > key_length ? this.N : key_length);
    for (; k; k--) {
      const s: number = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
        + init_key[j] + j;
      /* non linear */
      this.mt[i] >>>= 0;
      i++;
      j++;
      if (i >= this.N) {
        this.mt[0] = this.mt[this.N - 1];
        i = 1;
      }
      if (j >= key_length) {
        j = 0;
      }
    }
    for (k = this.N - 1; k; k--) {
      const s: number = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
        - i;
      /* non linear */
      this.mt[i] >>>= 0;
      /* for WORDSIZE > 32 machines */
      i++;
      if (i >= this.N) {
        this.mt[0] = this.mt[this.N - 1];
        i = 1;
      }
    }

    this.mt[0] = 0x80000000;
    /* MSB is 1; assuring non-zero initial array */
  }

  genrand_int32() {
    let y: number;
    const mag01 = new Array(0x0, this.MATRIX_A);

    if (this.mti >= this.N) {
      let kk: number;

      if (this.mti === this.N + 1) {
        this.init_genrand(5489);
      }

      for (kk = 0; kk < this.N - this.M; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < this.N - 1; kk++) {
        y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
        this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
      this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  /* generates a random number on [0,0x7fffffff]-interval */
  public genrand_int31() {
    return (this.genrand_int32() >>> 1);
  }

  /* generates a random number on [0,1]-real-interval */
  public genrand_real1() {
    return this.genrand_int32() * (1.0 / 4294967295.0);
    /* divided by 2^32-1 */
  }

  /* generates a random number on [0,1)-real-interval */
  public random() {
    return this.genrand_int32() * (1.0 / 4294967296.0);
    /* divided by 2^32 */
  }

  /* generates a random number on (0,1)-real-interval */
  public genrand_real3() {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
  }

  /* generates a random number on [0,1) with 53-bit resolution*/
  public genrand_res53() {
    const a = this.genrand_int32() >>> 5, b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }
}
