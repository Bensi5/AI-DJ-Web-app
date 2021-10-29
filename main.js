song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", getPosess);
}
function draw() {
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numberLeftWristy = Number(leftWristY);
        remove_decimals = floor(numberLeftWristy);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
    if (scorerightWrist > 0.2) {

        circle(rightWristY, rightWristX, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed=1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY < +400) {
            document.getElementById("speed").innerHTML = "Speed =2x";
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}
function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
function stop() {
    song.pause();
}
function modelLoaded() {
    console.log("Model is loaded");
}
function getPosess(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left wrist x =" + leftWristX + "  left wrist y =" + leftWristY);
        console.log("right wrist x =" + rightWristX + " right wrist y =" + rightWristY);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("score right wrist =" + scorerightWrist);
    }
}