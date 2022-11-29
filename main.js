let requestURL = './main.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';

request.send();

request.onload = function() {
    let list = request.response;
    list = JSON.parse(JSON.stringify(list));

    // JSONファイルを整形して表示
    let minecraft_util = "<ul>";
    
    for(let util in list){
        minecraft_util += "<li>" + list[util]["name"] + "<ul id='" + list[util]["name"] + "'>";

        let version = "";
        let latest = true;
        let releases_html = "";
        let version_name = "LATEST"
        $.ajax({
            url: list[util]["github-api-uri"],
            dataType: "json",
            success: function (data) {
                for (let item in data) {
                    if (data[item]["prerelease"] == false) {
                        version = data[item]["tag_name"];
                        if (latest == true) {
                            releases_html += "<li><a href='" + list[util]["javadoc-url"] + "'>" + version_name + "</a></li>";
                        } else {
                            version_name = version
                            releases_html += "<li><a href='" + list[util]["javadoc-url"] + "versions/" + version + "'>v" + version_name + "</a></li>";
                        }
                        latest = false;
                    }
                }
                document.getElementById(list[util]["name"]).innerHTML = releases_html;
            },
            statusCode: {
                404: function () {
                console.log('!!!!');
                }
            }
        });
        
        minecraft_util += "</ul></li>";
    }
    minecraft_util += "</ul>";
    document.getElementById("util-list").innerHTML = minecraft_util;
}