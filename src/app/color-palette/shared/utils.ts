export const colorConvertor = {
  _sRegHsl: /^hsla?\(\s*(\d+),\s*(\d+)%\s*,\s*(\d+)%\s*,?\s*(\d+\.?\d+?)?\s*\)$/i,
  _sRegHexa: /^#([0123456789abcdef]{1,2})([0123456789abcdef]{1,2})([0123456789abcdef]{1,2})([0123456789abcdef]{1,2})?$/i,
  _sRegRgb: /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,?\s*(\d+\.?\d+?)?\s*\)$/i,
  _sRegAlphaRgbHsl: /^(rgb|hsl)(?:a)(\(\d+,\s*\d+%?,\s*\d+%?)(?:,\s*\d+\.?\d+?)(\))$/i,
  _sRegAlphaHexa: /^#(?:[0123456789abcdef]{2})([0123456789abcdef]{6})$/i,
  _FORMAT_RGB_: 'rgb',
  _FORMAT_HSL_: 'hsl',
  _FORMAT_HEXA_: '#',
  _findFormat: function(sColor) {
    if (this._sRegHexa.test(sColor)) {
      return this._FORMAT_HEXA_;
    } else if (this._sRegRgb.test(sColor)) {
      return this._FORMAT_RGB_;
    } else if (this._sRegHsl.test(sColor)) {
      return this._FORMAT_HSL_;
    }
    return false;
  },
  _uniforme: function(sColor) {
    return sColor.replace(/ /g, '');
  },
  _format: function(sColor) {
    return sColor.replace(/,/g, ', ');
  },
  _hasAlpha: function(sStr) {
    return sStr !== undefined && sStr !== '';
  },
  toRgb: function(sColor, bSupAlpha) {
    sColor = this._uniforme(sColor);
    const sType = this._findFormat(sColor);
    bSupAlpha = bSupAlpha || false;
    switch (sType) {
      case this._FORMAT_HEXA_:
        return this._hexaToRgb(sColor, bSupAlpha);
      case this._FORMAT_HSL_:
        return this._hslToRgb(sColor, bSupAlpha);
      case this._FORMAT_RGB_:
        return this.toAlpha(sColor, bSupAlpha);
    }
    return undefined;
  },
  toHexa: function(sColor, bSupAlpha) {
    sColor = this._uniforme(sColor);
    const sType = this._findFormat(sColor);
    bSupAlpha = bSupAlpha || false;
    switch (sType) {
      case this._FORMAT_HEXA_:
        return this.toAlpha(sColor, bSupAlpha);
      case this._FORMAT_HSL_:
        return this._rgbToHexa(this._hslToRgb(sColor, bSupAlpha), bSupAlpha);
      case this._FORMAT_RGB_:
        return this._rgbToHexa(sColor, bSupAlpha);
    }
    return undefined;
  },
  toHsl: function(sColor, bSupAlpha) {
    sColor = this._uniforme(sColor);
    const sType = this._findFormat(sColor);
    bSupAlpha = bSupAlpha || false;
    switch (sType) {
      case this._FORMAT_HEXA_:
        return this._rgbToHsl(this._hexaToRgb(sColor, bSupAlpha), bSupAlpha);
      case this._FORMAT_HSL_:
        return this.toAlpha(sColor, bSupAlpha);
      case this._FORMAT_RGB_:
        return this._rgbToHsl(sColor, bSupAlpha);
    }
    return undefined;
  },
  toAlpha: function(sColor, bSupAlpha) {
    bSupAlpha = bSupAlpha || false;
    if (bSupAlpha === false) {
      return this._format(sColor);
    }
    const sType = this._findFormat(sColor);
    if (sType === this._FORMAT_HEXA_) {
      if (this._sRegAlphaHexa.test(sColor) === false) {
        return sColor;
      } else {
        return sColor.replace(this._sRegAlphaHexa, '#$1');
      }
    } else if (sType === this._FORMAT_HSL_ || sType === this._FORMAT_RGB_) {
      if (this._sRegAlphaRgbHsl.test(sColor) === false) {
        return this._format(sColor);
      } else {
        return this._format(sColor.replace(this._sRegAlphaRgbHsl, '$1$2$3'));
      }
    }
    return undefined;
  },
  _hexaToRgb: function(sColor, bSupAlpha) {
    const aRgb = sColor.match(this._sRegHexa);
    let a;
    let iDecale = 0;
    let bAlpha;
    if (aRgb != null && aRgb.length === 5) {
      bAlpha = this._hasAlpha(aRgb[4]);
      if (bAlpha === true) {
        iDecale = 1;
        a = aRgb[1];
      }
      return (
        (bAlpha === true && bSupAlpha === false ? 'a' : '') +
        '[' +
        parseInt(aRgb[1 + iDecale], 16) +
        ', ' +
        parseInt(aRgb[2 + iDecale], 16) +
        ', ' +
        parseInt(aRgb[3 + iDecale], 16) +
        '' +
        (bAlpha === true && bSupAlpha === false
          ? ', ' + Math.round((parseInt(a, 16) / 255) * 10) / 10
          : '') +
        ']'
      );
    }
    return undefined;
  },
  _rgbToHexa: function(sColor, bSupAlpha) {
    const aHexa = sColor.match(this._sRegRgb);
    let bAlpha;
    if (aHexa != null && aHexa.length === 5) {
      bAlpha = this._hasAlpha(aHexa[4]);
      aHexa[4] = aHexa[4] !== undefined ? Math.round(aHexa[4] * 255) : 255;
      return (
        '#' +
        (bAlpha === true && bSupAlpha === false
          ? parseInt(aHexa[4], 10).toString(16)
          : '') +
        parseInt(aHexa[1], 10).toString(16) +
        '' +
        parseInt(aHexa[2], 10).toString(16) +
        '' +
        parseInt(aHexa[3], 10).toString(16) +
        ''
      );
    }
    return undefined;
  },
  _hueToRgb: function(p, q, h) {
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
    if (h * 6 < 1) {
      return p + (q - p) * h * 6;
    } else if (h * 2 < 1) {
      return q;
    } else if (h * 3 < 2) {
      return p + (q - p) * (2 / 3 - h) * 6;
    } else {
      return p;
    }
  },
  _hslToRgb: function(sColor, bSupAlpha) {
    let h;
    let s;
    let l;
    let a;
    let q;
    let p;
    let tr;
    let tg;
    let tb;
    let bAlpha;
    const aRgb = sColor.match(this._sRegHsl);
    if (aRgb != null && aRgb.length === 5) {
      h = parseInt(aRgb[1], 10) / 360;
      s = parseInt(aRgb[2], 10) / 100;
      l = parseInt(aRgb[3], 10) / 100;
      a = aRgb[4] !== undefined ? parseInt(aRgb[4], 10) / 100 : undefined;
      bAlpha = this._hasAlpha(aRgb[4]);
      if (s < 0) {
        s = 0;
      }
      if (l <= 0.5) {
        q = l * (1 + s);
      } else {
        q = l + s - l * s;
      }
      p = 2 * l - q;
      tr = h + 1 / 3;
      tg = h;
      tb = h - 1 / 3;
      return (
        (bAlpha === true && bSupAlpha === false ? 'a' : '') +
        Math.round(this._hueToRgb(p, q, tr) * 255) +
        ', ' +
        Math.round(this._hueToRgb(p, q, tg) * 255) +
        ', ' +
        Math.round(this._hueToRgb(p, q, tb) * 255) +
        '' +
        (bAlpha === true && bSupAlpha === false
          ? ', ' + Math.round(aRgb[4] * 10) / 10
          : '')
      );
    }
    return undefined;
  },
  _rgbToHsl: function(sColor, bSupAlpha) {
    const aHsl = sColor.match(this._sRegRgb);
    if (aHsl != null && aHsl.length === 5) {
      const a = aHsl[4] || undefined;
      const r = aHsl[1] / 255;
      const g = aHsl[2] / 255;
      const b = aHsl[3] / 255;
      const bAlpha = this._hasAlpha(aHsl[4]);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h;
      let s;
      const l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return (
        'hsl' +
        (bAlpha === true && bSupAlpha === false ? 'a' : '') +
        '(' +
        Math.round(h * 360) +
        ', ' +
        Math.round(s * 100) +
        '%, ' +
        Math.round(l * 100) +
        '%' +
        (bAlpha === true && bSupAlpha === false ? ', ' + a : '') +
        ')'
      );
    }
    return undefined;
  }
};
