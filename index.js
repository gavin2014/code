var web3js;
var publicAddress;
var mainNetId = 1;
var gasLimit = 300000;
var emptyAddress = '0x0000000000000000000000000000000000000000';
var lockStatus = -1;
var minLockNum = 0;
var takeStatus = 0;

var $exchange = document.getElementById('exchange');
var $exchangeRate = document.getElementById('exchange-rate');
var $exchangeEth = document.getElementById('exchange-eth');
var $exchangeToken = document.getElementById('exchange-token');
var $walletAddress = document.getElementById('wallet-address');
var $tokenBalance = document.getElementById('token-balance');
var $ethBalance = document.getElementById('eth-balance');
var $referrerAddress = document.getElementById('referrer-address');
var $referrerLink = document.getElementById('referrer-link');
var $copyBtn = document.getElementById('copy-btn');

var $lockNum = document.getElementById('lock-num');
var $lock = document.getElementById('lock');
var $take = document.getElementById('take');
var $countDown = document.getElementById('count-down');
var $totalLockNum = document.getElementById('total-lock-num');
var $staticRate = document.getElementById('static-rate');
var $referrerRate = document.getElementById('referrer-rate');
var $staticBonus = document.getElementById('static-bonus');
var $referrerBonus = document.getElementById('referrer-bonus');
var $takeCount = document.getElementById('take-count');
var $remainCount = document.getElementById('remain-count');

var utils = {
  toWei: function(number, unit) {
    return web3js.utils.toWei(number, unit);
  },
  fromWei: function(number, unit) {
    return web3js.utils.fromWei(number, unit);
  }
};

if (!window.ethereum) {
  alert('请先安装MetaMask或其它DAPP钱包');
  throw new Error('请先安装MetaMask或其它DAPP钱包');
}
if (window.ethereum.enable) {
  window.ethereum
    .enable()
    .then(function() {
      checkNet();
    })
    .catch(function(err) {
      console.log(err);
      alert('请允许连接metamask');
    });
} else {
  checkNet();
}

function checkNet() {
  web3js = new Web3(window.ethereum);
  web3js.eth.net
    .getId()
    .then(function(netId) {
      if (netId !== mainNetId) {
        alert('请切换网络至mainnet');
      }
      return web3js.eth.getCoinbase();
    })
    .then(function(address) {
      init(address);
    });
}

var wallet = {
  sendTransaction: function(from, to, num, unit) {
    return web3js.eth.sendTransaction({
      from: from,
      to: to,
      gas: gasLimit,
      value: utils.toWei(num, unit)
    });
  },
  getBalance: function(address) {
    return web3js.eth.getBalance(address);
  }
};

var Token = (function() {
  function _Token(abi, address) {
    this.abi = abi;
    this.address = address;
    this.contract = null;
    this.exchangeRate = '';
  }
  _Token.prototype.init = function() {
    this.contract = new web3js.eth.Contract(this.abi, this.address);
  };
  _Token.prototype.getExchangeRate = function() {
    return this.contract.methods.buyPrice().call();
  };
  _Token.prototype.getBalance = function(address) {
    return this.contract.methods.balanceOf(address).call();
  };
  _Token.prototype.exchange = function(ethNum) {
    return wallet.sendTransaction(publicAddress, this.address, ethNum, 'ether');
  };
  _Token.prototype.approveAndCall = function(spender, tokens, referrer) {
    return this.contract.methods
      .approveAndCall(spender, tokens, referrer)
      .send({ from: publicAddress });
  };
  return _Token;
})();

var Lock = (function() {
  function _Lock(abi, address) {
    this.abi = abi;
    this.address = address;
    this.contract = null;
  }
  _Lock.prototype.init = function() {
    this.contract = new web3js.eth.Contract(this.abi, this.address);
  };
  _Lock.prototype.lockToken = function(tokens, referrer) {
    if (!referrer) {
      referrer = emptyAddress;
    }
    return token.approveAndCall(this.address, tokens, referrer);
  };
  _Lock.prototype.getLevelRate = function() {
    return this.contract.methods.getLevelRate().call();
  };
  _Lock.prototype.getPersonId = function(address) {
    return this.contract.methods.personsId(address).call();
  };
  _Lock.prototype.getLockInfo = function(address) {
    return this.contract.methods.getLockInfo(address).call();
  };
  _Lock.prototype.getMinLockNum = function() {
    return this.contract.methods.minLockNum().call();
  };
  _Lock.prototype.take = function() {
    return this.contract.methods.take().send({
      from: publicAddress
    });
  };
  return _Lock;
})();

var token = new Token(tokenAbi, '0x9483a0563410ff0825593ae1734f6cc330ffa928');
var lock = new Lock(lockAbi, '0x9483a0563410ff0825593ae1734f6cc330ffa928');
var update = {
  init: function() {
    update.address();
    update.ethBalance();
    update.tokenBalance();
    update.exchangeRate();
    update.levelRate();
    update.minLockNum();
    update.lockInfo();
  },
  info: function() {
    update.address();
    update.ethBalance();
    update.tokenBalance();
    update.lockInfo();
  },
  address: function() {
    $walletAddress.innerText = publicAddress;
    var origin = window.location.origin;
    $referrerLink.value = origin + '?referrer=' + publicAddress;
  },
  ethBalance: function() {
    wallet.getBalance(publicAddress).then(function(res) {
      var balance = utils.fromWei(res, 'ether');
      $ethBalance.innerText = balance;
    });
  },
  tokenBalance: function() {
    return token.getBalance(publicAddress).then(function(res) {
      var balance = utils.fromWei(res, 'ether');
      $tokenBalance.innerText = balance;
      return balance;
    });
  },
  exchangeRate: function() {
    token.getExchangeRate().then(function(res) {
      var rate = Number(res);
      token.exchangeRate = $exchangeRate.innerText = rate;
      if ($exchangeEth.value && !$exchangeToken.value) {
        $exchangeToken.value = $exchangeEth.value * exchangeRate;
      }
    });
  },
  levelRate: function() {
    lock.getLevelRate().then(function(res) {
      var str = '';
      res.forEach(function(rate) {
        str += rate + '% - ';
      });
      str = str.slice(0, str.length - 2);
      $referrerRate.innerText = str;
    });
  },
  minLockNum: function() {
    lock.getMinLockNum().then(function(res) {
      minLockNum = utils.fromWei(res, 'ether');
      $lockNum.setAttribute('placeholder', '最小锁仓数量为' + minLockNum);
      $lockNum.setAttribute('min', minLockNum);
    });
  },
  countdown: {
    timer: '',
    num: 0,
    start: function(countdownTime) {
      if (this.timer) {
        window.clearInterval(this.timer);
      }
      if (countdownTime === 0) {
        $countDown.innerText = this.num = countdownTime;
        return;
      }
      this.num = countdownTime;
      this.timer = window.setInterval(
        function() {
          this.num -= 1;
          $countDown.innerText = this.num;
          if (this.num === 0) {
            window.clearInterval(this.timer);
          }
        }.bind(this),
        1000
      );
    }
  },
  lockInfo: function() {
    lock
      .getPersonId(publicAddress)
      .then(function(id) {
        if (Number(id) == 0) {
          lockStatus = 0;
          return Promise.reject('此用户未参与锁仓');
        }
        return lock.getLockInfo(publicAddress);
      })
      .then(
        function(res) {
          if (res[0] !== emptyAddress) {
            $referrerAddress.innerText = res[0];
          } else {
            $referrerAddress.innerText = '无';
          }
          $totalLockNum.innerText = utils.fromWei(res[1], 'ether');
          $referrerBonus.innerText = utils.fromWei(res[2], 'ether');
          $takeCount.innerText = res[3];
          $staticBonus.innerText = utils.fromWei(res[1] / res[4] + '', 'ether');
          $remainCount.innerText = res[4] - res[3];
          $staticRate.innerText = 100 / res[4] + '%';
          var countdownTime = Number(res[5]);
          this.countdown.start(countdownTime);
        }.bind(this)
      );
  }
};

function getUserInfo() {}

function init(address) {
  publicAddress = address;
  token.init();
  lock.init();
  update.init();
  handle();
}

function handle() {
  window.ethereum.on('accountsChanged', function(accounts) {
    publicAddress = accounts[0];
    update.info();
  });

  var clipboard = new ClipboardJS('.copy-btn');
  clipboard.on('success', function(e) {
    alert('复制成功');
    e.clearSelection();
  });

  clipboard.on('error', function(e) {
    alert('复制失败，请手动复制');
  });

  $exchangeEth.addEventListener('input', function() {
    var value = Number(this.value);
    if (!token.exchangeRate) return;
    var num = value * token.exchangeRate;
    $exchangeToken.value = num;
  });

  $exchange.addEventListener('click', function() {
    var ethNum = $exchangeEth.value;
    if (Number(ethNum) === 0) {
      alert('请输入众筹ETH数量');
      return;
    }

    token
      .exchange(ethNum)
      .then(function() {
        alert('兑换成功');
        update.ethBalance();
        update.tokenBalance();
      })
      .catch(function(err) {
        console.log(err);
        alert('兑换失败');
      });
  });

  $lock.addEventListener('click', function() {
    var lockNum = Number($lockNum.value);
    if (lockNum === 0) {
      alert('请输入锁仓数量');
      return;
    }
    if (lockNum < minLockNum) {
      alert('最小锁仓数量为' + minLockNum);
      return;
    }
    update.tokenBalance().then(function(balance) {
      if (lockNum > balance) {
        alert('token余额不足');
        return;
      }
      var params = window.location.search.slice(1).split('=');
      var referrer = '';
      if (params.length > 1) {
        params.forEach(function(item, index) {
          if (item === 'referrer') {
            referrer = params[index + 1];
          }
        });
      }
      lock
        .lockToken(utils.toWei(lockNum + '', 'ether'), referrer)
        .then(function() {
          alert('锁仓成功');
          lockStatus = 1;
          update.tokenBalance();
          update.lockInfo();
        })
        .catch(function(err) {
          console.log(err);
          alert('锁仓失败');
        });
    });
  });

  $take.addEventListener('click', function() {
    if (takeStatus === 1) {
      return;
    }
    if (lockStatus === 0) {
      alert('参与锁仓后才能结算分红');
      return;
    }
    if (update.countdown.num > 0) {
      alert('请等待结算倒计时结束');
      return;
    }
    takeStatus = 1;
    lock
      .take()
      .then(function() {
        alert('结算成功');
        update.tokenBalance();
        update.lockInfo();
        takeStatus = 0;
      })
      .catch(function(err) {
        console.log(err);
        alert('结算失败');
        takeStatus = 0;
      });
  });
}
