<template>
  <div class="hello">
    <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <span>Giá tiền: {{ selected }}</span>
    <ul id="v-for-object" class="demo">
      <li v-for="(value, key, index) in object" :key="index">
        {{ key }}-{{ value }} - {{ index }}
      </li>
    </ul>
    <h1>{{ msg }}</h1>
    <h1>{{ cart }}</h1>

    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Nhập username" key="username-input" />
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Nhập địa chỉ email" key="email-input" />
    </template>
    <b-button v-on:click="getRandomFormLogin">toggle form login</b-button>

    <div class="random-value">
      <div v-if="isShowValue">Tài</div>
      <div v-else>Xỉu</div>
      <b-button variant="danger" v-on:click="getRandomValue">Random</b-button>
    </div>

    <b-button v-on:click="cart += 1" variant="primary">Add to cart</b-button>
    <b-container>
      <b-row>
        <b-col sm="12" md="3" xl="1">
          <b-aspect aspect="1:1" style="border: 1px solid #000">
            <b-img
              src="https://placekitten.com/300/300"
              fluid-grow
              thumbnail
              rounded="circle"
              alt="Responsive image"
            ></b-img>
          </b-aspect>
        </b-col>
        <b-col sm="12" md="3" xl="1">
          <b-aspect aspect="1:1" style="border: 1px solid #000">
            <b-img
              src="https://placekitten.com/300/300"
              fluid-grow
              thumbnail
              rounded="circle"
              alt="Responsive image"
            ></b-img>
          </b-aspect>
        </b-col>
        <b-col sm="12" md="3" xl="1">
          <b-aspect aspect="1:1" style="border: 1px solid #000">
            <b-img
              src="https://placekitten.com/300/300"
              fluid-grow
              thumbnail
              rounded="circle"
              alt="Responsive image"
            ></b-img>
          </b-aspect>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col sm="12">
          <b-list-group>
            <b-list-group-item
              v-for="(item, index) of items"
              v-bind:key="item.name"
            >
              {{ parentMessage }} - {{ index }} - {{ item.name }}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "abc",
      cart: 0,
      loop: 10,
      isShowValue: false,
      loginType: "username",
      parentMessage: "Parent",
      items: [{ name: "Cà phê" }, { name: "Trà đặc" }, { name: "Bò húc" }],
      object: {
        // tất nhiên chúng ta đều biết ông Bành Tổ không phải
        // họ Bành tên Tổ, nhưng đây chỉ là một ví dụ…
        họ: "Bành",
        tên: "Tổ",
        tuổi: 800,
      },
      selected: "50k",
      options: [
        { text: "Đọt bí xào tỏi", value: "50k" },
        { text: "Canh bông điên điển", value: "30k" },
        { text: "Lẩu nấm", value: "45k" },
      ],
    };
  },
  methods: {
    getRandomValue() {
      this.isShowValue = Math.random() > 0.5;
    },
    getRandomFormLogin() {
      this.loginType = this.loginType === "username" ? "email" : "username";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
