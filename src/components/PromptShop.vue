<template>
    <el-row class="all">
        <el-col :span="2" class="MyMenu">
            <el-menu default-active="2" class="el-menu-vertical-demo">
                <el-menu-item index="All" @click="changeType">
                    <span>All</span>
                </el-menu-item>
                <el-menu-item index="Ads" @click="changeType">
                    <span>Ads</span>
                </el-menu-item>
                <el-menu-item index="Business" @click="changeType">
                    <span>Business</span>
                </el-menu-item>
                <el-menu-item index="Chatbot" @click="changeType">
                    <span>Chatbot</span>
                </el-menu-item>
                <el-menu-item index="Coach" @click="changeType">
                    <span>Coach</span>
                </el-menu-item>
                <el-menu-item index="Code" @click="changeType">
                    <span>Code</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="22">
            <div class="allElement">
                <el-row :gutter="20" v-for="row in cardColumns" justify-content="space-between">
                    <el-col v-for="col in row" :span="8">
                        <el-card :body-style="{ padding: '0px' }" @click="sendMessage(col)">
                            <div class="background" :style="{ background: col.background }">
                                <span class="emoji">{{ col.emoji }}</span>
                            </div>
                            <div class="bottom" style="padding: 14px">
                                <span>{{ col.name }}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>

            <div class="footer">
                <el-pagination background layout="prev, pager, next" :total="100" />
            </div>
        </el-col>
    </el-row>
</template>
  
<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'

interface Prompt {
    id: string,
    name: string,
    description: string,
    details: string,
    type: string,
    background: string,
    emoji: string
}

const PromptsList = reactive({
    Prompts: [] as Prompt[],
})

function changeType(index: string) {
    console.log(index);
}

function sendMessage(col: Prompt) {
    console.log(col.id, col.name, col.emoji, col.description, col.details);
}

// 随机生成渐变颜色和 emoji
const getRandomBackground = () => {
    const randomColor1 = Math.floor(Math.random() * 255);
    const randomColor2 = Math.floor(Math.random() * 255);
    const randomColor3 = Math.floor(Math.random() * 255);
    const background = `linear-gradient(to bottom right, rgb(${randomColor1}, ${randomColor2}, ${randomColor3}), rgb(${randomColor2}, ${randomColor3}, ${randomColor1}))`;
    const emojis = ["🐨", "🐘", "🐇", "🐻‍❄️", "🦥", "🦛", "🍔", "🍟", "🍕", "🍩", "🍦", "🥨", "🍺", "🍷", "🍸", "🐶", "🦁", "🐯", "🐻", "🐮", "🐷", "🐰", "🐥", "🦆", "🌲", "🌳", "🌴"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return { background, emoji };
};


const fetchCards = async () => {
    // const res = await fetch('/v1/chat/prompts');
    // const data = await res.json();
    const data = {
        Prompts: [
            {
                'id': '1',
                "name": "111",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",

            },
            {
                'id': '2',
                "name": "222",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            },
            {
                'id': '3',
                "name": "333",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            }, {
                'id': '4',
                "name": "444",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            },
            {
                'id': '5',
                "name": "555",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            },
            {
                'id': '6',
                "name": "666",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            }, {
                'id': '7',
                "name": "777",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            },
            {
                'id': '8',
                "name": "888",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            },
            {
                'id': '9',
                "name": "999",
                "description": "string",
                "details": "string",
                "type": "code",
                "imgsrc": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            },
        ]
    };
    PromptsList.Prompts = data.Prompts.map((prompt) => {
        const { background, emoji } = getRandomBackground();
        return { ...prompt, background, emoji };
    });
}

onMounted(fetchCards);

const cardColumns = computed(() => {
    const columns = [];
    let column = [];

    for (let i = 0; i < PromptsList.Prompts.length; i++) {
        column.push(PromptsList.Prompts[i]);

        if ((i + 1) % 3 === 0 || i === PromptsList.Prompts.length - 1) {
            columns.push(column);
            column = [];
        }
    }

    return columns;
});
</script>
  
<style>
.el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
    width: 30%;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.el-card .background {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
}

.el-card .emoji {
    font-size: 48px;
}

.el-pagination {
    display: flex;
    justify-content: center;
}

.allElement {
    width: 80%;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
}

.footer {
    margin-bottom: 20px;
}

.MyMenu {
    height: 100%;
}


.all {

    height: 100%;
}
</style>
