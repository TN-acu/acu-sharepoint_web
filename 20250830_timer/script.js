// HTML要素の取得
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

// 音声ファイルを読み込む (ファイル名は適宜変更すること)
const alarmSound = new Audio('alarm.mp3');

let timerId = null; // タイマーのIDを格納する変数
let remainingTime = 0; // 残り時間を秒単位で格納する変数

// 初期表示を更新する関数
function updateInitialDisplay() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 時間表示を更新する関数
function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    // '05:01' のように2桁で表示するために padStart を使用
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// タイマーを開始する関数
function startTimer() {
    // 既にタイマーが作動中の場合は何もしない
    if (timerId !== null) {
        return;
    }

    // 残り時間が0の場合は、入力欄から時間を設定する
    if (remainingTime <= 0) {
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        remainingTime = minutes * 60 + seconds;
    }
    
    // 合計秒数が0以下の場合は処理を中断
    if (remainingTime <= 0) {
        alert('時間を設定してください。');
        return;
    }
    
    updateDisplay(); // すぐに表示を更新

    // 1秒ごとに関数を実行
    timerId = setInterval(() => {
        remainingTime--;
        updateDisplay();

        // 残り時間が0になったらタイマーを停止
        if (remainingTime <= 0) {
            stopTimer();
            alarmSound.play(); // 音声を再生
            //alert('時間です！');
        }
    }, 1000);
}

// タイマーを停止する関数
function stopTimer() {
    clearInterval(timerId); // setIntervalを停止
    timerId = null; // タイマーIDをリセット
}

// タイマーをリセットする関数
function resetTimer() {
    stopTimer(); // まずタイマーを停止
    remainingTime = 0; // 残り時間をリセット
    updateInitialDisplay(); // 表示を入力欄の値に戻す
}

// イベントリスナーの設定
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// 入力値が変更されたら、初期表示も更新
minutesInput.addEventListener('input', updateInitialDisplay);
secondsInput.addEventListener('input', updateInitialDisplay);

// ページ読み込み時に初期表示を設定
updateInitialDisplay();