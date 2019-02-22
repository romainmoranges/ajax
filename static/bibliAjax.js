   function $get(url,data,done,error) {
        let Xhr=()=>{
            let xhr = null;
            if (window.XDomainRequest) {
                xhr = new XDomainRequest();
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
            }
            return xhr;
        }
        let args = [];
        for (let i in data)
        {
            args.push(i+'='+encodeURIComponent(data[i]));

        }
        url +='?'+args.join('&');


        xhttp = Xhr();  // xhttp objet de type XMLHttpRequest

        xhttp.onload=function(){
            if (this.status==200) done(this)
            else error(this)
        }

        xhttp.open("get", url, true);
        xhttp.send();

    }

    function $post(url,data,done,error) {
        let Xhr=()=>{
            let xhr = null;
            if (window.XDomainRequest) {
                xhr = new XDomainRequest();
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
            }
            return xhr;
        }
        let args = [];
        for (let i in data)
        {
            args.push(i+'='+encodeURIComponent(data[i]));

        }
        args = args.join('&');


        xhttp = Xhr();  // xhttp objet de type XMLHttpRequest

        xhttp.onload=function(){
            if (this.status==200) done(this)
            else error(this)
        }

        xhttp.open("post", url, true);
        xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhttp.send(args);

    }