    <template>
    .mail-client
  section.mail-client__left
    button.new-message-btn
      span.icon.fa.fa-edit
      span New Message
    section.mail-client__categories
      div.mail-client__categories__item
        span.text Inbox
        span.number 34
      div.mail-client__categories__item
        span.text Sent
      div.mail-client__categories__item
        span.text Draft 
      div.mail-client__categories__item
        span.text Junk
      div.mail-client__categories__item
        span.text Trash
      div.mail-client__categories__item
        span.text Redminder
        span.number 1
    section.mail-client__labels
      span.mail-client__labels__title Labels
      div.mail-client__labels__item
        span.icon.fa.fa-circle-o
        span.text Personal
      div.mail-client__labels__item
        span.icon.fa.fa-circle-o
        span.text Work
      div.mail-client__labels__item
        span.icon.fa.fa-circle-o
        span.text Friends
      button.mail-client__labels__add
        span.icon.fa.fa-plus
        span.text Add
  section.mail-client__center
    .mail-client__sort-by
      span.sort-by Sort by 
      span.date Date
      span.icon.fa.fa-caret-down
    .mail-client__email-list
      article.mail-client__email-item
        span.mail-client__email-item__time 20:24
        span.mail-client__email-item__mark
        span.mail-client__email-item__circle.fa.fa-circle
        h5.mail-client__email-item__from Lisa Guerrero
        h5.mail-client__email-item__subject Comapany goals for 2016
        p.mail-client__email-item__preview Hello everyone, I am happy to share with you our new company goals.

      article.mail-client__email-item.selected
        span.mail-client__email-item__time 14:10
        span.mail-client__email-item__mark
        h5.mail-client__email-item__from 
          span.icon
          span.text Peter Gregor
        h5.mail-client__email-item__subject Design for health proyect
        p.mail-client__email-item__preview Hi Jessica, I love your UI work, and I would like to talk to you 
        
      article.mail-client__email-item
        span.mail-client__email-item__time 14:10
        span.mail-client__email-item__mark
        h5.mail-client__email-item__from 
          span.icon
          span.text Lisa Guerrero
        h5.mail-client__email-item__subject Comapany goals for 2016
        p.mail-client__email-item__preview Hello everyone, I am happy to share with you our new company goals.
        
      article.mail-client__email-item
        span.mail-client__email-item__time 14:10
        span.mail-client__email-item__mark
        h5.mail-client__email-item__from 
          span.icon
          span.text Lisa Guerrero
        h5.mail-client__email-item__subject Comapany goals for 2016
        p.mail-client__email-item__preview Hello everyone, I am happy to share with you our new company goals.
        
      article.mail-client__email-item
        span.mail-client__email-item__time 14:10
        span.mail-client__email-item__mark
        h5.mail-client__email-item__from 
          span.icon
          Lisa Guerrero
        h5.mail-client__email-item__subject Comapany goals for 2016
        p.mail-client__email-item__preview Hello everyone, I am happy to share with you our new company goals.
         
  section.mail-client__right
    .mail-client__right__up-section
      .mail-client__email-actions
        span.icon.fa.fa-trash
        span.icon.fa.fa-mail-reply
        span.icon.fa.fa-mail-reply-all
        span.icon.fa.fa-long-arrow-right
        span.icon.fa.fa-ellipsis-h
      .mail-client__search-container
        span.icon.fa.fa-search
        input.mail-client__search-box type="text" placeholder="Search"/
    .mail-client__email-detail
      span.mail-client__email-detail__from-to
        span.bold Peter Gregor &nbsp;
        span to &nbsp;
        span.bold Jessica Larson
      span.mail-client__email-detail__time 14:10
      img.mail-client__email-detail__avatar src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" alt=""/
      h4.mail-client__email-detail__title Design for health proyect
      .mail-client__email-detail__description
        p Hi Jessica,
        p I love your UI design work, and I'd like to talk with  you about possibly revamping the UI on our desktop application. Can we jump on Skype to discuss it when you have some time?
        p I am looking for a UI designer for an upcoming health app. We already have an established web presence and are now moving to the mobile space.
        p Have a nice day. Peter
      .mail-client__email-detail__response-container
        .mail-client__email-detail__actions
          .icon.fa.fa-font
          .icon.fa.fa-chain
          .icon.fa.fa-chain-broken
        textarea.mail-client__email-detail__response name="" cols="30" rows="10"
    button.mail-client__send-button Send

    </template>

    <script>
// Fonts
// import url(https://fonts.googleapis.com/css?family=Montserrat:400,700)

// // Colors
// $background-color: #636c94
// $background-email: #e6e9ec
// $white: #fff
// $black: #000
// $orange: #fd7c4e
// $violet: #c562ef
// $green: #10c286
// $border-color: #e5e9eb

// // Display
// $header-height: 75px

body
  background-color: $background-color
  font-family: 'Montserrat', Arial, sans-serif
  
button
  font-family: 'Montserrat', Arial, sans-serif
  cursor: pointer

.mail-client
  //Fix width for now
  width: 1300px 
  height: 800px
  margin: 50px auto
  display: flex
  flex-direction: row
  background-color: $white
  overflow: hidden

// Left section
  
.mail-client__left
  flex-basis: 15%
  background-color: $background-email
  
  .new-message-btn
    background-color: #02c386
    color: $white
    border: none
    height: $header-height
    width: 100%
    font-size: 14px
    
    > .icon
      margin-right: 10px
      
  .mail-client__categories
    display: flex
    flex-direction: column
    margin-top: 40px
  
  .mail-client__categories__item
    padding: 0 30px
    line-height: 2.5em
    display: flex
    justify-content: space-between
    color: #82929f
    cursor: pointer
    
    &:nth-child(1)
      > .text
        color: $black
      > .number
        color: #538fff
    
  .mail-client__labels
    display: flex
    flex-direction: column
    margin-top: 40px
    padding: 0 30px
  
  .mail-client__labels__title
    font-size: 13px
    margin-bottom: 10px
    
  .mail-client__labels__item
    line-height: 2.5em
    color: #82929f
    cursor: pointer
    
    > .icon
      margin-right: 10px
      
    &:nth-child(2) .icon
      color: $orange
      
    &:nth-child(3) .icon
      color: $violet
      
    &:nth-child(4) .icon
      color: $green
  
  .mail-client__labels__add
    border: none
    background: none
    text-align: left
    outline: none
    padding: 0
    font-size: 16px
    margin-top: 15px
    color: #82929f
    
    > .icon
      margin-right: 10px

// Center section
    
.mail-client__center
  flex-basis: 25%
  background-color: $background-email
  border-left: 1px solid rgba($black, 0.05)
  
  .mail-client__sort-by
    height: $header-height
    border-bottom: 1px solid rgba($black, 0.05)
    align-items: center
    display: flex
    padding-left: 50px
    font-size: 14px
    
    > .sort-by
      color: #8e9daa
      margin-right: 5px
    
    > .date
      margin-right: 5px
    
  .mail-client__email-list
    display: flex
    flex-direction: column
    
    .mail-client__email-item
      padding: 30px 50px 30px
      border-bottom: 1px solid rgba($black, 0.05)
      line-height: 1.5em
      position: relative
      
      &.selected
        background-color: white
        box-shadow: 0 5px 5px 0 rgba($black, 0.05), 0 -5px 5px 0 rgba($black, 0.05)
        overflow-x: hidden
      
    .mail-client__email-item__from
      font-size: 18px
      color: #262a2d
      
    .mail-client__email-item__subject
      color: #5f717f
      
    .mail-client__email-item__preview
      margin-top: 6px
      font-size: 14px
      color: #8d959f
      line-height: 1.5em
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      overflow: hidden
    
    .mail-client__email-item__circle
      color: #538fff
      position: absolute
      line-height: 2em
      font-size: 12px
      left: 30px
      
    .mail-client__email-item__time
      position: absolute
      right: 30px
      color: #c2c7cd
      font-size: 13px
      
.mail-client__right
  flex-basis: 60%
  position: relative
  
  .mail-client__right__up-section
    display: flex
  
  .mail-client__email-actions
    height: $header-height
    border-bottom: 1px solid rgba($black, 0.05)
    flex-basis: 60%
    display: flex
    align-items: center
    justify-content: space-around
    padding: 0 20px
    
    > .icon
      color: #a3adbb
      font-size: 24px
      cursor: pointer
      transition: all cubic-bezier 0.1s
      
      &:hover
        color: #538fff
        
  .mail-client__search-container
    flex-basis: 40%
    display: flex
    align-items: center
    border-left: 1px solid rgba($black, 0.05)
    border-bottom: 1px solid rgba($black, 0.05)
    padding-left: 35px
    
    > .icon
      color: #a3adbb
      padding-right: 15px
      font-size: 18px
    
    > .mail-client__search-box
      border: none
      outline: none
      font-size: 18px
      
  .mail-client__email-detail
    margin-top: 50px
    padding-left: 150px
    padding-right: 100px
    position: relative
    
    .mail-client__email-detail__from-to
      display: block
      font-size: 14px
      color: #8098ab
      
      .bold
        color: #454f57
    
    .mail-client__email-detail__time
      position: absolute
      right: 100px
      top: 0
      color: #b1b4b7
      font-size: 14px
    
    .mail-client__email-detail__avatar
      width: 30px
      height: 30px
      border-radius: 50%
      position: absolute
      top: 40px
      left: 90px
    
    .mail-client__email-detail__title
      font-size: 42px
      color: #262a2d
      line-height: 1.25em
      margin: 15px 0
      
    .mail-client__email-detail__description
      margin: 30px 0
      
      p
        color: #6a6c6d
        line-height: 1.75em
        margin-bottom: 10px
        
    .mail-client__email-detail__response-container
      padding-top: 30px
      border-top: 1px solid #e7eaed
      position: relative
      
    .mail-client__email-detail__response
      width: 100%
      border: 0
      outline: none
      color: #4d606e
      font-family: 'Montserrat', Arial, sans-serif
      font-size: 14px
    
    .mail-client__email-detail__actions
      position: absolute
      top: 0
      left: -60px
      display: flex
      flex-direction: column
      padding-top: 30px
      
      > .icon 
        margin-bottom: 20px
        font-size: 20px
        color: #b0b7c3
        cursor: pointer
        
        &:hover
          color: $black
        
  .mail-client__send-button
    position: absolute
    bottom: 0
    right: 50px
    border: 0
    color: white
    background-color: #02c386
    padding: 20px 40px    
    </script>