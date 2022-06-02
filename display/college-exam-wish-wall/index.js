(function ($) {
  function randomNtoM(minNum, maxNum) {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  }

  let container;
  // 可选颜色
  const colors = [
    "#ff0000",
    "#ffa500",
    "#ffd700",
    "#32cd32",
    "#1e90ff",
    "#0000ff",
    "#ff00ff",
  ];
  const background = ["", "", "", "future", "biye", "gaokao"];
  // 用户及其祝福信息
  const hopeList = [
    {
      name: "南方者",
      avatar:
        "https://p6-passport.byteacctimg.com/img/user-avatar/db3b09f9ca107d8843cee3fe8f4f0cd4~300x300.image",
      hope: "愿我弟弟和我未来的女朋友高考顺利！",
    },
    {
      name: "战场小包",
      avatar:
        "https://p9-passport.byteacctimg.com/img/user-avatar/f3c0335559b4f202ddb10c41e4767c0a~300x300.image",
      hope: "祝妹妹金榜题名",
    },
    {
      name: "红毛丹",
      avatar:
        "https://p9-passport.byteacctimg.com/img/user-avatar/a442e5c61fc0ed32c8c05da0878776b2~300x300.image",
      hope: "春风得意马蹄疾，一日看尽长安花",
    },
    {
      name: "手可摘棉花",
      avatar:
        "https://p3-passport.byteacctimg.com/img/user-avatar/80e502e2b46cc1ef687d9ae2ad3f3a1c~300x300.image",
      hope: "高考顺利，金榜题名",
    },
    {
      name: "Ylimhs",
      avatar:
        "https://p6-passport.byteacctimg.com/img/user-avatar/66c5c24cf9802ed4a9028eee7d05b14b~300x300.image",
      hope: "旗开得胜，勇夺佳绩",
    },
    {
      name: "追逐自由与梦想",
      avatar:
        "https://p26-passport.byteacctimg.com/img/user-avatar/2a8d6ccfbc571fc588cf3c40657b0986~300x300.image",
      hope: "友谊永长存，青春不散场，加油，兄弟们！",
    },
    {
      name: "月亮打烊了_",
      avatar:
        "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbf15fa4391e4d2f93ffec54aa5e645a~tplv-k3u1fbpfcp-no-mark:180:180:180:180.awebp?",
      hope: "李华 我希望你不要在为难我，我真的写不出",
    },
    {
      name: "jayjay",
      avatar:
        "https://p9-passport.byteacctimg.com/img/user-avatar/80d016f9fb13c2016ea82eca4546d1cb~300x300.image",
      hope: "考的都会，蒙的都对",
    },
    {
      name: "翊君",
      avatar:
        "https://p3-passport.byteacctimg.com/img/user-avatar/136e7ce810ef736dface20325cb2ce27~300x300.image",
      hope: `愿今日的风，
      化作明天的帆，
      带着你们一路破浪。`,
    },
    {
      name: "Captain",
      avatar:
        "https://p9-passport.byteacctimg.com/img/user-avatar/2ee55cb1e7f476ace6a73fc86a8ff7e2~300x300.image",
      hope: "也无风雨也无晴",
    },
    {
      name: "法医",
      avatar:
        "https://p26-passport.byteacctimg.com/img/user-avatar/ccf5b399305a43fb8c51d0ba1ee9cf31~300x300.image",
      hope: "燕子，别走，我离不开你鸭",
    },
    {
      name: "猪痞恶霸",
      avatar:
        "https://p26-passport.byteacctimg.com/img/user-avatar/197ec770e86cf205690a909d77787b02~300x300.image",
      hope: "金榜题名!!!",
    },
  ];
  // 祝福模板
  const hopeTemplate = function (option) {
    switch (option.id) {
      case 1:
        return `<div class="card-wrap">
      <div class="card">
        <div class="card-content">
          <div class="avatar">
            <img src="${option.avatar}" alt="" />
          </div>
          <h4>${option.name}</h4>
          <div class="hope">${option.hope}</div>
          <div class="img-wrap img-2">
            <img src="https://assets.codepen.io/1462889/sea.png" alt="" />
          </div>
          <div class="img-wrap img-3">
            <img src="https://assets.codepen.io/1462889/water.png" alt="" />
          </div>
        </div>
      </div>
    </div>`;
      case 2:
        return `<div class="card-wrap">
        <div class="card">
          <div class="card-content">
            <div class="avatar">
              <img src="${option.avatar}" alt="" />
            </div>
            <h4 class="username">${option.name}</h4>
            <div class="hope">${option.hope}</div>
            <div class="img-wrap img-2">
              <img src="https://assets.codepen.io/1462889/grass.png" alt="" />
            </div>
  
            <div class="img-wrap img-5">
              <img src="https://assets.codepen.io/1462889/Ivy.png" alt="" />
            </div>
          </div>
        </div>
      </div>`;
      default:
        return `<div class="card-wrap">
        <div class="card ${option.class}">
          <div class="card-content">
            <div class="avatar">
              <img src="${option.avatar}" alt="" />
            </div>
            <h4 class="username">${option.name}</h4>
            <div class="hope">${option.hope}</div>
          </div>
        </div>
      </div>`;
    }
  };

  //创建祝福页
  var createItem = function (hopeItem) {
    const id = randomNtoM(1, 5);
    const template = hopeTemplate({ id, ...hopeItem, class: background[id] });
    $(template).appendTo(container).drag();
  };

  // 定义拖拽函数
  $.fn.drag = function () {
    const $this = $(this);
    const parent = $this.parent();
    const hopeColor = randomNtoM(0, 6);
    console.log($(this).find("h4"));
    $(this).find(".hope").css({ color: colors[hopeColor] });

    $(this).find("h4").css({ color: "#000" });

    const pw = parent.width();
    const ph = parent.height();
    const thisWidth =
      $this.width() +
      parseInt($this.css("padding-left"), 10) +
      parseInt($this.css("padding-right"), 10);
    const thisHeight =
      $this.height() +
      parseInt($this.css("padding-top"), 10) +
      parseInt($this.css("padding-bottom"), 10);
    var x, y, positionX, positionY;
    var isDown = false;

    const randY = parseInt(Math.random() * (ph - thisHeight), 10);
    const randX = parseInt(Math.random() * (pw - thisWidth), 10);

    parent.css({
      position: "relative",
      overflow: "hidden",
    });

    $this
      .css({
        cursor: "move",
        position: "absolute",
      })
      .css({
        top: randY,
        left: randX,
      })
      .mousedown(function (e) {
        parent.children().css({
          zIndex: "0",
        });
        $this.css({
          zIndex: "1",
        });
        isDown = true;
        x = e.pageX;
        y = e.pageY;
        positionX = $this.position().left;
        positionY = $this.position().top;
        return false;
      });

    $(document)
      .mouseup(function (e) {
        isDown = false;
      })
      .mousemove(function (e) {
        var xPage = e.pageX;
        var moveX = positionX + xPage - x;

        var yPage = e.pageY;
        var moveY = positionY + yPage - y;

        if (isDown == true) {
          $this.css({
            left: moveX,
            top: moveY,
          });
        } else {
          return;
        }
        if (moveX < 0) {
          $this.css({
            left: "0",
          });
        }
        if (moveX > pw - thisWidth) {
          $this.css({
            left: pw - thisWidth,
          });
        }
        if (moveY < 0) {
          $this.css({
            top: "0",
          });
        }
        if (moveY > ph - thisHeight) {
          $this.css({
            top: ph - thisHeight,
          });
        }
      });
  };

  // 初始化
  var init = function () {
    container = $("#container");

    // 绑定关闭事件
    container
      .on("click", "a", function () {
        $(this).parent().remove();
      })
      .height($(window).height())
      .width($(window).width());
    $.each(hopeList, function (i, v) {
      createItem(v);
    });
  };
  $(function () {
    init();
  });
})(jQuery);
