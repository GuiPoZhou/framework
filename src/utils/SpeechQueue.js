class SpeechQueue {
    constructor() {
        this.queue = []; // 播报队列
        this.isPlaying = false; // 当前是否正在播放
    }

    // 将文本添加到队列中
    addToQueue(text) {
        this.queue.push(text); // 添加到队列末尾
        if (!this.isPlaying) {
            this.playNextInQueue(); // 如果当前没有正在播放，则开始播放队列中的下一条
        }
    }

    // 分块处理文本内容
    processText(text) {
        const segments = [];
        const regex = /([\u4e00-\u9fa5]+|[a-zA-Z]+|\d+)/g;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            segments.push(match[0]);
        }
        
        return segments;
    }

    // 播放队列中的下一条内容
    playNextInQueue() {
        if (this.queue.length === 0) {
            return; // 如果队列为空，什么也不做
        }

        this.isPlaying = true; // 标记正在播放
        const text = this.queue.shift(); // 从队列中移除并获取第一条内容
        const segments = this.processText(text); // 分块处理文本内容

        this.playSegments(segments, 0); // 播放分块内容
    }

    // 播放分块内容
    playSegments(segments, index) {
        if (index >= segments.length) {
            this.isPlaying = false; // 标记播放结束
            this.playNextInQueue(); // 继续播放队列中的下一条
            return;
        }

        const segment = segments[index];
        const utterance = new SpeechSynthesisUtterance(segment);

        // 设置语言，根据内容选择语言
        if (/[\u4e00-\u9fa5]/.test(segment)) {
            utterance.lang = 'zh-CN'; // 中文
        } else if (/[a-zA-Z]/.test(segment)) {
            utterance.lang = 'en-US'; // 英文
        } else {
            utterance.lang = 'zh-CN'; // 数字也用中文读法
        }

        // 设置播放结束后的回调函数
        utterance.onend = () => {
            this.playSegments(segments, index + 1); // 继续播放下一个分块
        };
        // 播放语音
        window.speechSynthesis.speak(utterance);
    }
}

export default SpeechQueue;