<view class="categoryList"><uni-search-bar vue-id="682abee0-1" placeholder="搜索商品信息" radius="100" clearButton="none" cancelButton="none" data-event-opts="{{[['^confirm',[['searchConfirm']]],['^input',[['searchInput']]]]}}" bind:confirm="__e" bind:input="__e" bind:__l="__l"></uni-search-bar><view class="box"><view class="left"><block wx:for="{{categoryList}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view data-event-opts="{{[['tap',[['setList',[index]]]]]}}" class="{{['item',(scrollActive==index)?'active':'']}}" bindtap="__e">{{''+item.cateName+''}}</view></block></view><view class="right"><scroll-view class="scroll" scroll-y="true" scroll-into-view="{{clickId}}" scroll-with-animation="true" data-event-opts="{{[['scroll',[['scroll',['$event']]]]]}}" bindscroll="__e"><block wx:for="{{categoryList}}" wx:for-item="item" wx:for-index="index" wx:key="index"><view class="item-box" id="{{'sp'+index}}"><view class="title"><view class="line"></view><view class="name">{{''+item.cateName+''}}</view><view class="line"></view></view><view class="list-box"><uni-grid vue-id="{{'682abee0-2-'+index}}" column="{{3}}" showBorder="{{false}}" highlight="{{false}}" data-event-opts="{{[['^change',[['clickItem']]]]}}" bind:change="__e" bind:__l="__l" vue-slots="{{['default']}}"><block wx:for="{{item.children}}" wx:for-item="it" wx:for-index="idx" wx:key="idx"><uni-grid-item vue-id="{{('682abee0-3-'+index+'-'+idx)+','+('682abee0-2-'+index)}}" index="{{it.id}}" bind:__l="__l" vue-slots="{{['default']}}"><image class="image" src="{{it.pic}}" mode lazy-load="{{true}}"></image><text class="cateName">{{it.cateName}}</text></uni-grid-item></block></uni-grid></view></view></block></scroll-view></view></view></view>