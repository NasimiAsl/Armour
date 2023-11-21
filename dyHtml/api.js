
function downloadFile(filename, data) {
  const blob = new Blob([data], { type: 'text/csv' });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  }
  else {
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}
var md5f = [];
var md5 = function (s, t, f) {

  var iframe = document.createElement('iframe');
  iframe.src = 'https://file.5kb.me/submit/content/item?type=' + t + '&md5=' + s;
  document.body.appendChild(iframe);

  md5f[t] = f;

}

var apiPath = 'https://data.expan.app/';



function readFile(ctl, fun) {

  const FR = new FileReader();

  FR.addEventListener("load", function (evt) {

    fun(evt.target.result);
  });

  FR.readAsDataURL(ctl.files[0]);
}







var dn = function (op) {
  op = def(op, {});
  op.type = def(op.type, "Get");
  op.url = def(op.url, "/");
  op.success = def(op.success, function (data) { });
  op.error = def(op.error, function (data) { });
  op.end = def(op.end, function () { });
  op.begin = def(op.begin, function () { });
  op.option = def(op.option, {});

  function processData(data) {
    op.success(data, op.option);
  }

  function handler() {
    op.subProgress = def(op.subProgress, function (p) { });
    op.subProgress(this);
    if (this.readyState == this.DONE) {
      if (this.status == 200) {
        // success!
        processData(this.responseText);
      } else {
        op.error(this);
      }
      op.end();
    }
  }

  try {
    var client = new XMLHttpRequest();

    client.onreadystatechange = handler;
    client.open(op.type, op.url);
    client.setRequestHeader('Access-Control-Allow-Origin', '*');
    op.begin(client);
    client.send();
    client.onprogress = function (pe) {
      if (pe.lengthComputable) {
        op.progress = def(op.progress, function (p) { });
        op.progress(pe.loaded * 100 / pe.total);
      }
    };
  } catch (e) {
    op.error(e);
    op.end();
  }
};
var up = function (op) {
  op = def(op, {});
  op.type = def(op.type, "POST");
  op.url = def(op.url, "/");
  op.success = def(op.success, function (data) { });
  op.error = def(op.error, function (data) { });
  op.end = def(op.end, function () { });
  op.begin = def(op.begin, function () { });

  function processData(data) {
    op.success(data);
  }

  function handler() {
    if (this.readyState == this.DONE) {
      if (this.status == 200) {
        // success!
        processData(this.responseText);
      } else {
        op.error(this);
      }
      op.end();
    }
  }

  try {
    var client = new XMLHttpRequest();
    op.begin(client);
    client.onreadystatechange = handler;
    if ("withCredentials" in client) {
      client.open(op.type, op.url, true);
      client.upload.onprogress = function (pe) {
        if (pe.lengthComputable) {
          op.progress = def(op.progress, function (p) { });
          op.progress(pe.loaded * 100 / pe.total);
        }
      };
    } else if (typeof XDomainRequest != "undefined") {
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      client = new XDomainRequest();
      client.onreadystatechange = handler;

      client.open(op.type, op.url);
      client.upload.onprogress = function (pe) {
        if (pe.lengthComputable) {
          op.progress = def(op.progress, function (p) { });
          op.progress(pe.loaded * 100 / pe.total);
        }
      };
    }

    if (def(op.file)) {
      var data = new FormData();
      _for(
        op.file,
        function (at, i) {
          data.append("file" + i, at.data);
        },
        function () {
          client.setRequestHeader("content", JSON.stringify(op.data));
          client.send(data);
          client.upload.onprogress = function (pe) {
            if (pe.lengthComputable) {
              op.progress = def(op.progress, function (p) { });
              op.progress(pe.loaded * 100 / pe.total);
            }
          };
        }
      );
    } else {
      client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      client.send(def(op.data, false) ? JSON.stringify(op.data) : "");
      client.onprogress = function (pe) {
        if (pe.lengthComputable) {
          op.progress = def(op.progress, function (p) { });
          op.progress(pe.loaded * 100 / pe.total);
        }
      };
    }
  } catch (e) {
    op.error(e);
    op.end();
  }
};

function ds(p, fn) {
  dn({
    url: p,
    success: function (d) {
      window.eval(d);
      if (fn) fn();
    }
  });
}

var GUX = {};
/** GUX DB  */
GUX.XHR = {
  dn: function (op) {

    op = def(op, {});
    op.type = def(op.type, 'Get');
    op.url = def(op.url, '/');
    op.success = def(op.success, function (data) { });
    op.error = def(op.error, function (data) { });
    op.end = def(op.end, function () { });
    op.begin = def(op.begin, function () { });
    op.option = def(op.option, {});

    function processData(data) {
      op.success(data, op.option);
    }

    function handler() {
      op.subProgress = def(op.subProgress, function (p) { });
      op.subProgress(this);
      if (this.readyState == this.DONE) {
        if (this.status == 200) {
          // success!
          processData(this.responseText);
        }
        else {
          op.error(this);
        }
        op.end();
      }
    }

    try {

      var client = new XMLHttpRequest();

      client.onreadystatechange = handler;
      client.open(op.type, op.url);
      op.begin(client);
      client.send();
      client.onprogress = function (pe) {
        if (pe.lengthComputable) {
          op.progress = def(op.progress, function (p) { });
          op.progress(pe.loaded * 100. / pe.total);
        }
      }
    } catch (e) { op.error(e); op.end(); }

  },
  up: function (op) {
    op = def(op, {});
    op.type = def(op.type, 'POST');
    op.url = def(op.url, '/');
    op.success = def(op.success, function (data) { });
    op.error = def(op.error, function (data) { });
    op.end = def(op.end, function () { });
    op.begin = def(op.begin, function () { });

    function processData(data) {
      op.success(data);
    }

    function handler() {

      if (this.readyState == this.DONE) {
        if (this.status == 200) {
          // success!
          processData(this.responseText);
        }
        else {
          op.error(this);
        }
        op.end();
      }
    }

    try {

      var client = new XMLHttpRequest();

      client.onreadystatechange = handler;
      if ("withCredentials" in client) {
        client.open(op.type, op.url, true);
        op.begin(client);
        client.upload.onprogress = function (pe) {
          if (pe.lengthComputable) {
            op.progress = def(op.progress, function (p) { });
            op.progress(pe.loaded * 100. / pe.total);
          }
        }

      } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        client = new XDomainRequest();
        client.onreadystatechange = handler;

        client.open(op.type, op.url);
        op.begin(client);
        client.upload.onprogress = function (pe) {
          if (pe.lengthComputable) {
            op.progress = def(op.progress, function (p) { });
            op.progress(pe.loaded * 100. / pe.total);
          }
        }
      }

      if (def(op.file)) {
        var data = new FormData();
        _for(op.file, function (at, i) {
          data.append("file" + i, at.data);

        }, function () {
          client.setRequestHeader("content", JSON.stringify(op.data));
          client.send(data);
          client.upload.onprogress = function (pe) {
            if (pe.lengthComputable) {
              op.progress = def(op.progress, function (p) { });
              op.progress(pe.loaded * 100. / pe.total);
            }
          }
        });
      }
      else {
        client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        client.send((def(op.data, false) ? JSON.stringify(op.data) : ''));
        client.onprogress = function (pe) {
          if (pe.lengthComputable) {
            op.progress = def(op.progress, function (p) { });
            op.progress(pe.loaded * 100. / pe.total);
          }
        }
      }
    } catch (e) { op.error(e); op.end(); }
  }
};

GUX.dataRow = function (p, id) { this.partition = p; this.iden = id; };

GUX.dataRow._ErrorInSave = 500;
GUX.dataRow._ErrorInLoad = 404;
GUX.dataRow._Saved = 300;
GUX.dataRow._WaitToSaved = 100;
GUX.dataRow._WaitToDownload = 101;
GUX.dataRow._UpdateByServer = 200;
GUX.dataRow._WaitToUpdate = 201;

GUX.dataRow.prototype = {
  iden: null,
  event: null,
  log: null,
  watch: function (fun) {
    this.event = fun;
    return this;
  },
  partition: 99999,
  liveData: null,
  status: null,
  setId: function (id) {
    this.iden = id;
    return this;
  },
  /* */
  save: function (data) {

    var th = this;

    for (var i in data) {
      if (data[i] != undefined)
        data[i] = data[i].toString().replace(/,/g, '#comma').replace(/;/g, '#semicolon');
    }

    th.liveData = data;
    th.status = GUX.dataRow._WaitToSaved;
    if (th.log) th.log(th);

    data = JSON.stringify(data);
    up({
      url: 'https://data.expan.app/api/Submit/950DA5EE-3130-4C14-98DA-D353780B8B72', data: { data: data, id: th.iden, Part: th.partition },
      success: function (d) {
        th.iden = d.replace(/"/g, '').split('|')[1].valueOf() * 1;
        th.status = GUX.dataRow._Saved;
        if (th.log) th.log(th);
        if (th.event) th.event('success', th);
      },
      error: function (d) {
        if (th.event) th.event('failed', d);
        th.status = GUX.dataRow._ErrorInSave;
        if (th.log) th.log(th, d);
      },
    });
    return th;
  },
  load: function (fields) {
    var th = this;
    var o = '_start_';
    var index = 0;
    for (var i in fields) {
      var ps = fields[i];
      fields[i] = index;
      index += 1;
      o += ',' + ps + i;
    }
    o = o.replace('_start_,', '');
    th.status = GUX.dataRow._WaitToDownload;
    if (th.log) th.log(th, d);
    dn({
      url: 'https://data.expan.app/api/xobjs?c=1&i=0&p=' + th.partition + '&o=' + o + '&s=' + th.iden, success: function (d) {
        d = JSON.parse(d);
        th.status = GUX.dataRow._WaitToUpdate;
        for (var i in fields) {

          fields[i] = d[0].p[fields[i]].toString().replace(/,/g, '#comma').replace(/;/g, '#semicolon');
        }
        th.liveData = fields;
        th.status = GUX.dataRow._UpdateByServer;
        if (th.log) th.log(th, d);
        if (th.event) th.event('success', th);
      },
      error: function (d) {
        th.status = GUX.dataRow._ErrorInLoad;
        if (th.log) th.log(th, d);
        if (th.event) th.event('failed', d);
      },
    });
    return th;


  },

  list: function (fields, filter, start, count, dc) {
    var th = this;
    var o = '_start_';
    var index = 0;
    for (var i in fields) {


      o += ',' + fields[i] + i;

      fields[i] = index;
      index += 1;
    }
    o = o.replace('_start_,', '');
    th.status = GUX.dataRow._WaitToDownload;
    if (th.log) th.log(th, d);
    dn({
      url: 'https://data.expan.app/api/xobjs?c=' + count + '&i=' + start + '&p=' + th.partition + '&o=' + o, success: function (d) {
        d = JSON.parse(d);
        th.status = GUX.dataRow._WaitToUpdate;

        var res = [];

        for (var j in d) {

          var fil = {};

          var f = 0;

          for (var i in fields) {
            if (d[j].p[fields[i]]) {

              var val = d[j].p[fields[i]].toString()
                .replace(/,/g, '#comma')
                .replace(/__disc__/g, '')
                .replace(/;/g, '#semicolon');

              console.log(val, filter[i], f);

              if (filter && filter[i] && (filter[i] == 'all' || filter[i] == val)) {
                fil[i] = val; f++;
              }
            }

          }

          console.log(f);


          if (f == dc)
            res[d[j].o] = (fil);
        }
        th.status = GUX.dataRow._UpdateByServer;

        if (th.log) th.log(th, res);
        if (th.event) th.event('success', res);

      },
      error: function (d) {
        th.status = GUX.dataRow._ErrorInLoad;
        if (th.log) th.log(th, d);
        if (th.event) th.event('failed', d);
      },
    });
    return th;
  }
}

function cd(v) {
  return v
    .replace(/"/g, '_!gt_')
    .replace(/'/g, '_!tt_')
    .replace(/;/g, '_!sq_')
    .replace(/,/g, '_!co_')
    .replace(/{/g, '_!as_')
    .replace(/}/g, '_!ae_')
    .replaceAll('[', '_!bs_')
    .replace(/]/g, '_!be_')
    .replace(/`/g, '_!qq_')
    .replace(/=/g, '_!eq_')
    .replace(/:/g, '_!d2_')
    .replace(/\\/g, '_!sl_');



};
function dc(v) {
  return v
    .replace(/_!gt_/g, '"')
    .replace(/_!tt_/g, "'")
    .replace(/_!sq_/g, ';')
    .replace(/_!co_/g, ',')
    .replace(/_!as_/g, '{')
    .replace(/_!ae_/g, '}')
    .replace(/_!bs_/g, '[')
    .replace(/_!be_/g, ']')
    .replace(/_!qq_/g, '`')
    .replace(/_!eq_/g, '=')
    .replace(/_!d2_/g, ':')
    .replace(/_!sl_/g, '\\');

};


function saveToDataBase() {

  if (currModelIden > 0) {

    new GUX.dataRow(1001).setId(currModelIden).watch(function (s, d) {

      if (s == 'success')
        alert('data saved successfly.');

    }).save({
      currrim: localStorage.currRims,
      datapart: cd(localStorage['DataParts_' + localStorage.currRims]),
      data: cd(localStorage['Data_' + localStorage.currRims]),
    });


  } else {
    alert('please create new Model or chose your model id from user Panel.')
  }

}

var __log = function(d){
  first('.log').innerHTML = d;
}


var temp_baseIdentity = 0;
function initInnerContent(d, fn, fs, pms,fe) {

  fn = def(fn, function (d) {
    return d;
  });
  fs = def(fs, function (d) {
    return d;
  });


  d = d
    .replaceAll(
      "<loader>",
      `<img src="[#images]/preload.png?[#date]" class="h-01" onload="templateLoad('`
    )
    .replaceAll("</loader>", `',this)" />`)
    .replaceAll("$$root", window.baseURL)
    .replaceAll("$$src=", "src=")  
    .replaceAll("$$date", new Date().getTime())
    .replaceAll("$$images", "/images");

  if (pms) {
    for (var pm in pms) {
      d = d.replaceAll('$$' + pm, pms[pm]);
    }
  }

  var sd = [];
  if (d.indexOf("/// live script") != -1) {
    sd = d.split("/// live script");
    d = sd[0];
  }
  fn(d);
  if (sd.length != 0) {
    window.eval(fs(sd[1]).replace("<script>", "").replace("</script>", ""));
    requestAnimationFrame(function(){fe(TsID[pms.TID])})
  }
}

window.behindLoopContainer = [];
window.behindLoop = function () {

  for (var i in window.behindLoopContainer)
    if (window.behindLoopContainer[i])
      window.behindLoopContainer[i]();

  requestAnimationFrame(window.behindLoop);
}
window.behindLoop()
window.TsID = [];
window.loadPage = function (page, ctl, fun, root, pms,fs) {
  dn({
    url: def(root, '/editor/htmls/') + page + '.html', success: function (d) {
      temp_baseIdentity++;
      pms = def(pms, {});
      pms.TID = temp_baseIdentity;
      initInnerContent(d, function (d1) {
       
       
        if (!fun) ctl.innerHTML = d1;
        else fun(ctl, d1 , pms);
      },null, pms, function(){
        pms.event = TsID[pms.TID];
        if(fs)fs(pms);

      });
    }
  });
};