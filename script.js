//获取元素
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
// 歌名
const songs = ['clock', 'hard', 'memory'];
// 设置当前索引号
let songIndex = 2;


// 将歌详细信息加载到 DOM 中
loadSong(songs[songIndex]);

// 加载音乐
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// 播放
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// 暂停
function pauseSong() {
  musicContainer.classList.remove('play');
  //对dom节点添加一个class
  playBtn.querySelector('i.fas').classList.add('fa-play');
  //对dom节点移除一个class
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// 上一首
function prevSong() {
	//索引号-1
  songIndex--;
   //当索引号小于0，令索引号变为最后一首   
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  //加载音乐
  loadSong(songs[songIndex]);
  playSong();
}

// 下一首  
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// 更新进度条
function updateProgress(e) {
	// 可获取事件的对象引用
  const { duration, currentTime } = e.srcElement;
    // 进度条百分比
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// 设置进度条
function setProgress(e) {
	// 宽度为该元素的像素宽度
  const width = this.clientWidth;
   // 点击的X坐标为事件对象的x坐标
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}


// 按钮事件监听
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// 下一首
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//更新歌
audio.addEventListener('timeupdate', updateProgress);

// 点击进度条
progressContainer.addEventListener('click', setProgress);

// 播放完毕
audio.addEventListener('ended', nextSong);

// audio.addEventListener('timeupdate',DurTime);
