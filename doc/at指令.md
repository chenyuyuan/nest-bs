at+cm2mclinew="49.4.85.232","5683","868334033365754"
at+cm2mclisend=6557
at+cm2mclidel

AT+CM2MCLIGET?

at+cimi
at+cgsn=1
at+cm2mclinew="119.3.250.80","5683","868334033365754"
at+cm2mclinew="119.3.250.80","5683","88887777"
iot-coaps.cn-north-4.myhuaweicloud.com

sudo minicom -D /dev/ttyS0



at+cm2mclinew="iot-mqtts.cn-north-4.myhuaweicloud.com","1883","12345678"
at+cm2mclinew="iot-coaps.cn-north-4.myhuaweicloud.com","5683","868334033365754"


axios.get(`${server.baseURL}/data/datas`, ).then(resdata => {

        console.log(resdata)
      console.log("length:"+resdata.data.sensordata.length)
      var len=resdata.data.sensordata.length;
      var temp = resdata.data.sensordata
      
      for(var i=0;i<len;++i) {
        var now = new Date((temp[i].time).toString())
        var thevalue = temp[i].value
        var timestr = now.getFullYear() + '/' + (now.getMonth()+1) +'/'+ now.getDate()+' ' +now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()
        //console.log(timestr)
        //console.log(thevalue/10)
        //console.log(this.data)
        //_this.data.shift();
        this.data.push({
        name: now.toString(),
            value: [
                timestr,
                thevalue/10
            ]
        });
      }
      //console.log(resdata.data.sensordata.time)
      //console.log(data.data.sensordata.value)

      //console.log((resdata.data.sensordata.time).toString())

    });