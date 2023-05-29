<template>
    <div class="all">
        <div class="container">

            <div class="card" v-for="(s, index) in all.story" :key="index" :title=s.name :name=index>
                <img src="https://images.fallenlondon.com/icons/prisonwindow.png" />
                <div style="width: 100%;">
                    <h2 class="name">&emsp;{{ s.name }}</h2>
                    <div class="content">&emsp;&emsp;{{ s.description }}</div>
                    <div style="display:flex;justify-content:flex-end;align-items:flex-end; ">
                    <el-button class="playButton">开始游玩</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface story {
    gameId: string,
    name: string,
    description: string,
}
const all = ref({ story: [] as story[] });


onMounted(async () => {
    axios.get('/api/v1/game/story').then(response => {
        all.value = response.data;
    }).catch(() => {
        all.value = {
            story: [{
                gameId: "1",
                name: "岳阳楼记",
                description: "庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴，乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上，属予作文以记之。(具 通：俱)"+

                "予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？",
            }, {
                gameId: "1",
                name: "故事的名字2",
                description: "乱写的故事描述2,这个也不短",
            }
            ]
        }
    })
})

</script>

<style>
.container {
    z-index: -1;
    top: 4px;
    right: 4px;
    bottom: 4px;
    left: 4px;
    border: 2px solid #897d67;
}


.card {
    background-color: #ede3d2;
    box-shadow: 0 5px 5px 0 #91856e;
    border: 8px;
    margin: 8px;
    display: flex;
    flex-direction: row;
    padding: 8px;
}

.name {
    font-weight: bolder;
    font-size: larger;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;

}

.content {
   
    margin-left: 1em;
}

.playButton{
 
    box-shadow: 0 3px 2px 0 rgba(0,0,0,.5);
    z-index: 0;
}

img{
    height: 130px;
    width: 100px;
}
</style>
