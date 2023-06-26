/*!
 * Copyright 2023 SamuelLouf
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (Scratch) {
    'use strict';
    const skype = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAYAAACP3YV9AAAAAXNSR0IArs4c6QAAIABJREFUeF7tfQmYHFW59nuqu6enp2fLZCaZTJbJwoQkLGEJSwCRCFyUIKsCigSVRX42N1yuyr3Bx+v18bohIpsXLoqAkcWwBowiGFBBWRMIkIUkk332mZ6e6aXOfb46Vd1V1aeqTvX0EP2v9Tww6e5aTp33fO/3ft/56hTDeG+ca/hDahJyfALyvBnQFwPsGDC0ALweHJMBJADkAT4AXd+NXG4Uudwb0NgfwPMbEIntBe/rwhnzBse7uf+o52fj1vBb/xpD+5zzAe08cP0QMDQArNa4HpdcNZsB8jmA04+2HTh0AL1g6IaO3wPaDfhI2/pxa/c/6IkrC+QjO2oQqzsKyH8UHB8FQ7MncPRDXgfyWQGgBZ4MZJ32ywH5PJDN6MhlXkRe/xVyeAR7H9mE5csJ7P/TW+WAfLj7AMQiPwewEEDEE0DD4DiQHQH0vOh8AzwJgrkcMDIMZEZMS3XsxpEbzWF09DYMLrkGy9n/aTDHBiTnDI92H4Fo7Gvg/DQDQJlFWUARgLkMoJsUKts3lwVG02R5pqWa4JHl0m+GZebEILCOZ+gC2A2YPONnaJ5Wh2h+MrhWIzdRPQUtshsDA9tx7vT0/y9mXD6Qa3gd+vsuAdh3AUQdHWL4OdtmAEhAZEr7zbBQXfyeGigCRMcQWGSN9B+hRvsyBkSigBYBapJAdRJoaAQSSfFbuI04/VUAq6DjFQAvA5EBDG3tx7kHSBob7uTv5d6h79xo3ON9c6BzotFjCo2VWZfhB3PCurhJo9YBFoAjaSCTFv6PvqP9R4edVqdpAqxaAqwGiFebYGpj7yt7uzmGAd4HzjeCaWvB87+DPvoEPtw2PPYLje8ZwgFpUGnvaQC7D4AHdZn+zvCDowD5OfdG4iWbBYbJAnXxnwUgWSZtsSqgOgE0TgQam8TnSm9OEN1qWVyN8x0AVkLT7oeWfRMfbNlZ6WZU4nzqQC7nGg7tvxYa/3cBoiNEcLaFrMsuUESPiH1GR4DhoaLQIbBJ0NAxtFVVAW0zgPpGIBorhy6D+6UEQFv7Cr+ZVG6djSELXe8CY09Cw3U4dWJn8IXeuz3UgKSYsHXWV6FpXwd4XCpoqM26KWYMqzJ7xOoYssCRlLBSstZMxqTUHMA0oL4BmDgJaJgAEJWO11YOiG6fD05U+xi4difYyDN/D9QbDCTR6crer0HDt0oBdI1aUpuWZVkdRn/JOlP9JlXpwPBgUfjE4sDcBcL3jdfm9t/ucMfLCi2B5WiXi4kYW4vq0aV4bkrnvgyBgoFc2XsRuP4TACIrY2OhwmfycUSZVlxo/UCgpgeBzKiwUHtMWFMLTJkGNE0cL/hK2yoF0MUcxv15xlA2j+I4Tgf4A4aCP6Plr+N7Q/Kz+wP5wN6liGiP+saGBohpcfP2+yelmuoT3xPAVmgRjQKtUwWI47n5WaHjN1e7S2nU2Ur7YHBbMqUTGf8vVOnfx6lT9o7n7bnP7Q3kyvV1yLf8DeAdXsxiAGRYosvxpIdECEGdQn8toEl9zpgNVFeP3z0qAegCT2qFMjHntl6JNdNNc2yArn8e50x5bPxu1HlmOZAreAKRnocAfoq0IdR+CiusQN2iW7LOkSEhYox/pwStkniZPhNobRvf+1IJJ2R+z88KVf1nSRLE6JQfYgjXYVlranxvHJAD+eu95wPsl2DQpGGGEfNRtsUeenFgqFeIGEqGG7Sqi+D9oENFAD9em5cS9aNQFSEjDbHc1uymZlencEYq73CcM3nTeN0+nbcUyHt2T0ZMewHADCdQZjMsEO0j0PCBfSKop9BjZFDQ6sQWYNpMIB4fn3tQDSUcfSsTMx40GsaX+ilhYAt0/nXwNffh3HNdKa7KdI0TSAr6F3TdDOCy4ultI47AIeXpAFEHhnqEoCGBQ9kaynm2TAZm7bcPA3oTPQfYPmq0ALaCH5Tlkq0Os1OxYwCxLBi/DE2td2MJk6S7xgaoE8if75qE6sjfwPm0EqVqgEjqlGaLzNaSHyRLJH9pZGiGRGvaZwNTxskfBvpBlXBCUciUCCfXF14K1u1yip91cPwImPJlnMsqaplOIO/d++9gfLljbFBjCTzyiVbim76zQLSS4ukBMSMxczYwuXVsw0t2tJIaVbFCRTD8QJTSqMrgsGid34Z4/Fqc0VKx0pUikCt2tiCvvQNOJRmueV6yNpoPtNMGZWroe6JTCjfIYjvmApOoBKeCmxKA5YQTKn5R4k/ttOpJowHtMY7T78B50y+uVE8VgfzlrssAdmvhxFYjCUCazS/4AC6S3sbUU06k28gnzpoNtFbYEgNp1DbifH2hGzQJ/bpVrDyccEgHeXmKCoiWa8ItyHZfi2ULxxye2IG8GxwXOHwj0WeGxI1t3FBwT2k3+o3CDfpx+gygfWalBpfzevZR77DOgDDATStSOpRQcRhAPS1SRvEumqNjmTFavorzptPk/Jg2AeTTPIrOPZ3gvMiLxgwFBfY2n2zM4vcLX0mWSNY6ZSowe3Zl1GmJBcosbgxixm8gVMwCfeNKZ32SASbLQc9/AW/fedNYisgEkL/YuRQ6HnUMCQrsyf8VKNW0QAI2TRmbNFBXBxy8EIiIWquyNyU/KBvl7gMlo76kOk9hIJTlB2WUqjIQjfb0Q+cn4oL2v5XbhwLIO3feB4bzCiexamWMUMPciE6toij6dyIBLFw4tmDfD8BCHyh0vCsDozGgLa6hqYrZMh6io+lsg1mObek8co4csauaz0/IuMZLyWyJ0kAwhVSxD7Yhr78fy2ZuLgdMhlt31CCOLeCsuXCnRqkiVbqZpyR1OtxvhhxErRw46ECgqamca4pjKmSFLVUMHUkNc5IRHDshitk1ERzeEDVA9NvSeY43B/PYkMrjnaEcXujNYstwHu+m8ujPUuMUBFGJP5UxgsQq3TNF1nk4HsHGTWdj+ZLQCQOGn+1oh4Y3CjU4pESNZLi1UQ61RyhUmooivzh1KrBfmVkbJQCDw4lDGyL4wuxqnNIcQ32MIU5mOMYtlePozeq4e2sat21OY3PK0gchlKgDS/dgMM/jrbDz0PlnsWzmTWFvheFnnSeCaU9QuZMowSCValIqXZBiRPqOfCZRKvnFww4LL26UaNTshZJ9xReT4wzntsXx6elVOKR+HJPwVNSgc9y/fQT/uX4Ia/ttBlJWeq6ERksnr4uqOgOePxbL5oSaoGb47x0XgBuljZqRasvZZjXI+ijEIGCH+gTdLDw4PKWqqlEPVRlhwInNMdx9SBIt8XGs55GYQVbnOPP5Xjyxa8TpCu3hTFAY4qiBD5jIFud9HBfOPA2MydSc1FiJWi8Ex/+A6xoyKedMP6XdiGYpUZ5NA21twP5z1awxjAX6iIdEhOFHB9Tg4ulxEKD7YuvL6jj1jz34UzfV57puTAqoLSNk7a50nLUzy4PnL8Oy2Xeqgslw+/aLAX47slmGHNXWmBv5xMEeYY0UO8aiwJGL1FSqkgVKaNR1s+0JDQ8sqjXEy77eXu7N4ojVe5AvACMRMUYjA/2gczDYrdnJSFsQw1H4+OzdKvfOcGvnZwDcYvhBytYYbeFAiiaJaW5xSORUZ0wH5jqrPkouoCpkfCzQOuf0BMPqo+sxNznGGFWlFxT2oUhl5qO7sG3YSwBRbZLrRCVhiK2D/MIb8RsHwzW4aDYVvgVuDLd0Xg49d7MR4FsbAThM01P0tx+ojgPHLPauN60QjZqjCOQGnzy6Hu9vigXewHu5w8Gr9uD1fnuSxLy6O5yoVJaII4Vcfh4u7Qgshma4edulGEnd5gjsLN84ShmcEWBeBzB9urzPSmjUY9R5KNHiSYs73HZwEpfMqPaoQ3kvoXNea85ju7Bp0KVgvUOJ0scFvWnUlV+2nVTHD3DxnGvlzx0W28dww1sXQdfvNAyZNsrqUNxoKNVeYYWLjwRq6OlwawS6KcT1g2qDTQaxn+3IhiieP66hLGFD/uu57gye687ihd4MukadoyzGmJEwOLgxigX1URzfXIUqxfhzayqH/R/fjRGqRzL6yd5qn/xqkKINHgjvYIgfhGs6bAKmdDAzfG/9BWBm+EG/G1VwVMJID5imgWltwIJ5ziO9xIxH+CDwkilpt/Vy3HBgEtfMsg0aBQPMceAvPVl8/rUBvNjr9fRzqeynRMKy9hpcPieJWckISCHLhDHFlB/7Uw8e3Cap3/WLK437LvzP2+rc/eMGX+cX45KOO/y6guH7608XVdKICpFDWRxzliOiAccdLR6sCeMH/QB1W6HtRilC7PngRDTE1OOMkTzHFa8MYsX2EaRytkSGnT58Rz1HMsowvy6Kc6YlcNmcJJqqirEqnf+61/tx41tDGC1IVtfA9BMuNhylaT+1BMMuaNH5+NQsCualG8MP3jwIOqequWqRhusF8lRENQhMagYOPdh7ftDdyBB+sIineRAHTmqJ4beLRYGC6vb1dUP49ls0L1s8jzg2VNliwXKqIwynt1Xj8AlVGMhy3LFpCDvTtqejZezilSQPw1B2y5X1K9eW4tI5j3sD+Z2NDYiOdoKj1kjBUeBPIodqdA6cL6jV2qQ04e7AEOWGjgYLpfovk9Sfg8xzjkmP7UVPhh69cDSyPBpzd7zdD4ZRomEGuBRASZ+C34pL5l7uDeQKHsGWdc9CxzEY6jJn/vtE9ub4xUCi2pvng0a9lEZlPkNYz9snNaEjRNx4w8YUPv/KoI31ldJfwQOT+jGAjp2DW3ZPElYIk90pHZibkWbzvUSPcEbfWXs98pl/M2JGih3JMhvrgaOPMNsbRFsqVigdZY4O23ByE+bUqCcAPvx8Lx7d6a54t5pcKqSc48qDSYJVZIG5Hf8IxQgeg9nFUJJ5ziNx2f4vyqxSAPntZ1uQrdqC0eGEMdtBMx2LDgFazEfe7I0sU8iUdKLEn244eaIxr6i6nf3nXjzU6SoMsx+sRFs2QK02lWU5ARV3BZDKHGCiAx/GpfufKcu/FuXhN555DrncMYbIoez08aZatSPgN1ql+wVboV2UhAVyRWca5/+5z1T4rpERxp+PmUZV5itVrDDwPDuQHz0QVxxMVW+OrQjkv/7+euhc0GuyBjhmkVmLE1StNoYOdFnP2ydPREetukVS/nPuqj3YOOQ3X+jtkz39oJ+CdNBf8AS4gx496TcQQMtpDyKbX4yrDljnDeSXn1oEnf8J6cEo2iYDhxwgiR1L+LB4viD57ADNDb74/MjiRpzWGu6Bnwc601j2Qh+GKStQ8vSUm8Yk00sGMB505wtaJYSVeQFVv0w3yNnHcPn+v/IGktYK+NzDjyGb/RAWdAAzbbnVkqyMpIPCxnGSDjy2KYY1J4SrA6KW/Lk7g9P+2F0ahrj9ebnhhK8uCFn+WEAgxEBwWvL3cPn8L3kDSb9cdu9RiERX4/1H16I2KQmqHUPUIynsoQa9RIitkZRQ6TltspFpCbPRKf7ak8E31w3iiZ1pMWfoFmjl+EGJIHO0S9WS3Zbt6sZQjMD5Wlyx4CB/IK/+cRx8+iqcdOwJpbWqQWorNE1IB8JdixqwrD1crtW6KerXp/eM4gsv9+GNgSyyhKgqbfn5L7+Ol1KzzC+P4TkS5/X7ka6dgi8419ErHfo3vnYmZk59yOX8xEdlP1hOB4oLnNgSx+rjw9Gre3QO5jhe7B7Fzzak8MC2YWTsOdL3vONVGMrDVXkxQi5yCK7Zn9bQK2ylQP6m6yRE2G9tyPmnvwKflVBRtUVrpgb97vgmnDApXpH5yLcGsrj+9X6s2TOKzuE8uFLxsLKKLB3gvv50DFZpPy9jS/D/5v/BH8iHuz8Pxn9g98nShHRonpeNOjkdT6jS8NeTWjA7RHIgyKdS4nvN3lFc/1of1vVKVuayKEeVit1+LwyAdmbzpHQfV8X5VbjqQEfta6lFPrz3djB2iTqNhhhlIdTfiZOqcP8xTWiMVbb8kVh29c407t6cwhOdw+getaRsOe5AQpsl+WeV8CYk/YL/FFceeKW3Ra5YEUHixJXgfGmlpoWKvrUgSRysLX5306/4fERTDL8/oQW1IVVskHVaxtSb0XH9q7246c0BW3WcvC1jYii3vijHCgvdx2lC4yHsXfAR+5JpToukmZDqricBnFiRaSFf+gmenKXGLW6O4ebDJ+DgxvErxFrbl8H/vDOE298ewEDWPjntthQFCwwz3eXHUL6+nD+FyW+eal8hpBTIqq4nwXBiwWxC+wyVm/ehG8lopZKM+4+diPe1xEETv+O1bR7M4pNr9uL5PSPFJ7X8whK/vlG2wrLSfE9h8htBQO55EozZLNLH6botzk8ASSnUdYCXCCA2AbBkUjV+eHjjuFonpfpW7xjGlX/qQmdKVv+j0vG2+7IPBK9wwk6bDg/kGZY8hdYgi4yZQMpO7gZDdbRKj3M30oe2bLvS03JfnF+Hi2YnMbc+VpEQRWbhmwazuOjZ3Xh+90hxqb0whVbjq2pDABmYflLwF+U+PxhUds+BxiqGs6bX4EeLJqC+wsrWApaKrQjMX22ilbxccHv1z5iEjApDGfs8hdb1AdRKFklix76NW3GRhDqsa3n5Hzv9ApgU13D2jBqcPzOJo5or70PTOY5L1+zGPRsHzZcE+ahaPxDVquUK0kSqUYqG8RSmBANJz0qeLI8jK2yFbtU2xtmJ/eqjuP3oiTh2UjViioXHKsKJlOxxD2/D6z1mjbCfS3HrhEplvhwDga/ClLdO81atNJX1m733guvF9QQ8nfUYAmiZ/1C0wJJZDXuAZ55jQWMVPtpeg0s66jAtWZknuTYMZHHkQ1vQOyp57YXsMfUw/jS0JfO78dmFy+wlH6Va/oGd3wFjXzH6x0tFhlGnQY1UDW/CWIHZieQ6v3xgIy7arw5z6mIYq5Hevr4fn3l2l61bVBiqQpkvx8Bg38TnDqa3PRS2UiAf3H4+eOTe0FXRysCbN69Ko0EDIcCXM3A0xSM4uS2B7yyaiPba8i1070ges+7ZhJSRNAgqgVFJzZmd5nYxQcJKz38EXzyMng7wA3L3YnD9+aJFyi6m0ki1cEJ5UtVXzqu1Jxlh+MrCCbhs/wZMTqjXBlm9RXdEFnn7m7SosO1bv45XHuAhLFdPn4EvLn7YH8i7dsxAkr0rFuUtr+ze7rYK6iv0Q6AqtKVSZuEciERBM+uiePxf2jCvUb2q3bqnPek8Jt/1jnlbPgrWE0AFKwwsx+z+HQa6T8XycwsPa5ZSKyXOtfd1Ary1rCozGU1Y38meyNpH84NEsbccNwmnTEuGSirQrUz7+TvYYWR9zC2w42104qsJ3ANDdlweYF2DyGMJrj2lsFKWPHF5/45V4DAXpg8/6qVWOB7JZOM+VW5eYgWcG4r2xbNmoDURzm9++PFteHSLuchwYOKkDBD9hB0fBWiZ9GhsJa5ecpalXD2A3HkVdP1GOweHUrBjHnXyjpdSttt3Oj4HV38vnZHEI6dMDWWVVzy7EzevtdUI29W9ry8vp/LA1ReclhofAWrrsohVHY1PL3qJ9vCyyFOgc1pkUAzVMPRXTjw4FjB8R69tKPpY7vZPzEFbjbpVfnbNLvz4tZ4C8ZTW01bCDxZ42yms8vQUeQ5oaKIC8uvw6cO+5Q3kA53TkGevgGNicJnHGJYjCWM9ynFk+FH/xzNm4LhW9cq9z63ZhRteJSDdgkxFoKkpbGFAdk6k+6LXM3YDNNFe3wREI8/iU4e+3xvIOzdXIxF7CQzziyeUNJJGeeiAXuYzQnR+uXFl4bKlnf/nM9tx1GR1IK9+did+8rrdIivsB73omdNbcXuAeAyom0ArdKbQmJyO09p7vWdp79tyPRD5Nxt/OE18PMKJsgSRzArUJ65pkbA9n+xAc7V6XHnh6k7cvd58+56KVSoJMg9DsRtldgDGGw+TteLtfvSOzUTN13BG2396A3nv1jYwthkctmDLRaNldbzMfzg7npYQOG9WLY5sjhtePJXleGZXGn/ZM+LKdZbDCM4O+3hHHX7xgamh0ncH3rMB63okz2VWJL/qxU70uo49tGKg8I+0EtmEZvr7e7w69WT/uol7t/0OwAcKiQFVNRoq6+EMH/avj2H1B6dgmkR8UIrsP17pwX2bBkGBuXNCwHYeRRU5rTaKl86ZhZYQWR5aHKL59jfNNJ1MkJjfBYYlCv7Ufh/5UWC0WyzMUdco/jY1E7D9qK6ZEQDk1mvB8V9jfww7gDbMn2kxxLfOnoGOeu9CK9q1cyhnTPYuf6kHqaxtNsIPQJffqYloeORD07AkZELgjztSOP4Ba5HjEIzgq8wVNEKmH8ingGQdEE+YtJoANDYMRA73B/KeHfOg59aJl52NRW3Zid47trtqfgNuPLrZtbP3R1rK+sfr+vDg5iFsHMhg93DOVfxXOoCm1EQMhfrdxZMxsy5cZR5VDMz5+dvYPmQWOIcWeiGt0C7QhvcC9PIewxrjQCPRqkZAZgF2hj+Q9K6s/bbdD/CzHN0ZJq4ssI8sA+NUe6+dNR0HTQif/6QOHsrqeLs/g4e3pLA9lcX63lH0ZXQMZnQjQX7kpAROmlaDE6cm0RDXEKXFLkJuf9mdxvH3b3Q+S1IpneDXp7TSykgfECO12iCANOJIRkDqiOATwXdzX+dc5PKUPUiqVQ0oqC87Bdr86Rtnz8D8MhLZIfEoa3dq5sdXbcV9b1vvinYFeiFoXbn+hy5Bj2WndosYkqzRALNRvM6RgIxoOiLRZcFAUtFyZutj4LaXgkqBCE6HBQ2E35zUijPai69yLqvHx+Egut373u7Dx1dtM6MxN7u4hZZCXKkKPFnjcA8QqwKS9UKtNjQTgELBRiMc8eqLg4GkNv1i0+mAtlKeb5WEE2UVGgFz6qNYf047omOdyq8wmC/uTmPpw5uxd9g+42FTrGMRMlLtYetTWvuIFCuJnKpqINkgXtVBroH6KV5Frzq+VA1IelPPti1rAH5UadrI3mshZko8bv6+D7TivNl1FYai/NOt6x7BBx7chD0lIHqEOw5jVekPHwFEK1oPdokVOg1ajQL1E8UiHYZ/1IDaWg5NUwSS+uHuLcdC578F54nAMhBV2nCPRgAT4xoePKkN75uSCDUjUT5U3kc+3ZnCJ1ZtxY4UqVSvGiYJI4V5Issec9sHN7HawB6xwGNtg/CNiTogkRSUStZIsWR1goOxT6lZJF1gBa/C8Lu/AuNnhnLWnskB7xiMShm/efhEfHJuPVpDzEpUCsxdwzn85JUu/MeLe4qn9BBovn3hBt9zMEisktYDHOwFolFBp5Y1EoDWf5Smi0Z1MHahOpDUiAd3TcLg8EZjAcJKyW6JVdK5qWGN8QiuWNCIrx/ahES0ss9JeoH+y/W9+NyzO9BNmSM//+VwDQE6wcvqvMooqW97dorVfWtI4JDQoURATRFEArg6QaInDw0XhAOS2nvnhqvB2A2FFZelNKoS+MriSvdx4nNtVMPJ05I4oqUax01J4OjJiYoVIPeN5vHEu4N4unMIq7cOYfOAWQZTtgWqKNoAOh7oFSt0UrxYXSussXaC8I2WNVaTNdJnjCKqnRQeyBXbEhjO0nuY56tVDUjST9KRLgdRlh6MMIal7UkcNSmBD7XXGpPCJOKIkknxGrZLpWPmKSkUoywQ/UdPLK/vGcGTW4fw5NZBvLqXXsziIVw8BFnBYdoxkzKU7QSqLobeENi9R4QXFG6Q5dVR8B8t+kbyl5SmI/Q0NohIZl54IKltd22cgTynksmprpyY+vKYyv7CP8FAA7Qhphkg1sY01ESZ8W+6MVrPlfqX3qYznNWNvOxITmSB5DFtGR2vTL8K+VRa+Lh7t1hqtaZWWCTRKYkcmmWj0UoAkzXSX/rM2Hbk0/uVByQ1/r/fuRJgVNcjyibdo9fFMMH1qzI6DpHf9b2+QifaTb+chIfbD4Zpj3W9vh5gOCVekpOoFVRaa5R0mNYHkdEhn0kjmNBj/A5cNFUxISBTBsufjmL6tG+Aw1a6/h7OBoy145UZQSZkXErHy5+6BZFfomSgHxikwiomwg3yf8kJAjRBoSJuJGukf4s8K4fGlmDZlGfKt0hD+GxuRD67EmDHlxQzK6naAKfv7uygz77BuNsPetBomM4fQ7zsYKiREaC7S4BIlmgo0hqguq7oFxmBaKhU0xoJSGxH7XPt9FTW2ICkm75pXS2qYhvorYCCXlXUqAqAKudReQy8AkLGT5yFcSmy85Bf3LVT9Ft1UlBntAqobTR9oGmNsbhIChiUalmkdgc+PeViU9vJeDPkd7e9fQiAZwBeXzhSlW7cWZCKWXIFBoJfaBUEoN99WU2jl+Xs3g1ks8ICSYmSP0w2CpVq+EACLSIAJmo1KNb8XsMnccm0uyoHpEGzGzuQyT0Lhla1OtgQD624Oy2oE8tK2ofw754BvoxpPARbPg/s3AXQX/KDpFI10y8WxA1Zn+kXC36ykNnpQizZgU9NMN4FMnZqtRvvbRuOAc+tMc7rFzcF+qEy/Jeyv3qPHofzs2b6bedOIJMRIJJfJMuroVRc3KZIKZ9K845mDGnNeBi5VlyLz8z4vtX9lQWSznrLGx1gGiXX24XPtCMdYjbA1+r2QTjhaYWytrhu3A5qNicskd6eGzUT4SRgEpSKc4MYByLkF00qLVrluwA/DFe0F55bqDyQQgC1IqJRpboQQGFmAwp9IIsry6E/FWHl0/F+NBq2/JFodPt2gF6UFiFLpJkMok4SOcmiTyRUCGRKCNBmCRwLSMZ+gCunX+v/6HlIneO5+0/eoLep0wqGS4sCyJ0lUH2upBx/qpJgUBREga5Adh6Xe0gNixCDwIzGgSoCjiyRQKwpgkjWR1bots4iiBuhRY7CVdO67X0/PhZpXYGKt1re+KlYbZI7S7lVVW3gqFeMD0NnmsbIJBaO1H4K9LvMRwwIILI+kicUJ5IapX9bCWKiWSOPaoYZBQANes2B8Y/gs7NWug1ofIGkqy1fV4VJOAMcNwqqVbECSScHlItcAAAEjElEQVSWU7lnnMZ9PcW40s+3u8/rJbQoRtzbBQwPC4uromCf6JKETR0QrTYt0RZmkLixQLT7RkPo4CFoMz+Ga1jJuyTHH0hr6NyydiFy7FaAHy5ecWj94KbAcoSMi8ZkfrncRIVSXOu6BzqGXhK3p0soUyMOpNwpCZcIkGgw36li5kupvZTNiVGsaOVQbQLHAJa/gcHEEVjeNixzZ+8dkHT1H78ThzZKi/p+D+DEKd6zJX934YQKk9ALsznQ1QUMDIqbi5hzigQGZWxInZJvpM3ofTPgJ2FD31tJAPdf8JPxpTmrvTTJewuk1YofvjYbEXwTnJ0OhrpQqrZcFanMAGUygvFK4xTQ3QNQiEFWGEsI0UIAkbWROjUKo23dTuqU6Nb62rA+S6kaVjmACLsEX5z9az8dum+AFD6G4adr5yGHX5h0q5inlVBxiWW7vqiEsPIbCOlRYNduIEPV+0STpqCxQKmZIMIJuxXSvwlkCvbpIAuJArWa3+n4Er62HwX+EslfhHbfAVlUtlFMWPth8DwtybUUHLGgQuZC8wOFjIfvdOAcMqC3upOunUoB/YMAhRb02QgbKOlNoFFWJiEUqlGnawdLE5RLVmsH126VGksD2nUY3XIDli+xFdTK7XLfA2lv1/dfWggW+RYYPxZgDeDcdCYVFEShwxDXtSmYTw+LcGLUrO8h6qyiGhrzuRVD0NQLYK0etnwe/UZg24E1wDR3FLSagqZ/FV+de5PsFYP7Xuz4kXzRQjXUvzQbiC4C+GfB+aLCohSCkp1nUa23GVM4wYH0CNDbD4yMFilUiwqro79GeBARgT4B6rZCQ+xYVGoTOnagBbiDgH4urpu3SqW7rH3+viyytOUMP3x5IXI6vfzyfeCYC2ak/WJq854qaT6JP6UHZnJ5EToMjwCDQzbrI8CIQqucFmj5Rfs9WKqUADbAtVOpC0xjX/4MNP0ifGPBljAgFtg57EH7ZH8qLWlubcBIqgXAceDaBQCOF/SrAJjKvCf5Ogob0mkquwNIiVqWzMjaaL6QrM9kfCNPSvEhlWN42AQpVwKwIFZtvtICmiEDsGtQk74bX1pIr3APvf29W2TwDX335Q4gPwvgE8ExG2BtYGhE3kwJUp9TbFfkoDzyep9RfdY/2ID+wUuRyUwwFKd9o843/ouZ00hWhtGMBy1RIwXQpFkjAWCkZ5y+svg5B4aVQOTbWN7xcpAy9euMf3wgg6H23+OjKyKozt0Mrl+ESDyGaJQJ0eLqGsP/1ZhCxXVK+660HylSO8B2ISOETQ7gf4M+ciG+dai5QuHYbuSfQFL/LV+uYefhc8Aip0PHeWBYBC3CDBol2jQmdo3CUnlv09dW+o0o2L0VKXQXGH4NLXI/EHsBy2fZ3vT9TyDH1gOyo7/ywgHIs6sBfgI9IAYweg9i6cMnRsAfFUJGijEbAON90NkrQP5eHHLAr3EuLQRQ+e2fFunXp19eUwc91ox8vgVavANa/gRwbR6YFkck1gpNqwMME6RE9m6jfJ/ruwDteWjsL8hlusFYL6oO3Gt/j1XlYQT+F8wJdxYtWDjHAAAAAElFTkSuQmCC';
    const twitter = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNTEuOTEwMDQiIGhlaWdodD0iMjUyLjcxNDg2IiB2aWV3Qm94PSIwLDAsMjUxLjkxMDA0LDI1Mi43MTQ4NiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTExNC4wNDQ5OCwtNTMuNjQyNTcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0zMzcuOTUsMTI5LjI5YzAuMTUsMi4xNyAwLjE1LDQuMzQgMC4xNSw2LjUzYzAsNjYuNzMgLTUwLjgsMTQzLjY5IC0xNDMuNjksMTQzLjY5di0wLjA0Yy0yNy40NCwwLjA0IC01NC4zMSwtNy44MiAtNzcuNDEsLTIyLjY0YzMuOTksMC40OCA4LDAuNzIgMTIuMDIsMC43M2MyMi43NCwwLjAyIDQ0LjgzLC03LjYxIDYyLjcyLC0yMS42NmMtMjEuNjEsLTAuNDEgLTQwLjU2LC0xNC41IC00Ny4xOCwtMzUuMDdjNy41NywxLjQ2IDE1LjM3LDEuMTYgMjIuOCwtMC44N2MtMjMuNTYsLTQuNzYgLTQwLjUxLC0yNS40NiAtNDAuNTEsLTQ5LjV2LTAuNjRjNy4wMiwzLjkxIDE0Ljg4LDYuMDggMjIuOTIsNi4zMmMtMjIuMTksLTE0LjgzIC0yOS4wMywtNDQuMzUgLTE1LjYzLC02Ny40M2MyNS42NCwzMS41NSA2My40Nyw1MC43MyAxMDQuMDgsNTIuNzZjLTQuMDcsLTE3LjU0IDEuNDksLTM1LjkyIDE0LjYxLC00OC4yNWMyMC4zNCwtMTkuMTIgNTIuMzMsLTE4LjE0IDcxLjQ1LDIuMTljMTEuMzEsLTIuMjMgMjIuMTUsLTYuMzggMzIuMDcsLTEyLjI2Yy0zLjc3LDExLjY5IC0xMS42NiwyMS42MiAtMjIuMiwyNy45M2MxMC4wMSwtMS4xOCAxOS43OSwtMy44NiAyOSwtNy45NWMtNi43OCwxMC4xNiAtMTUuMzIsMTkuMDEgLTI1LjIsMjYuMTZ6IiBmaWxsPSIjMWQ5YmYwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0xMTQuMDQ0OTgsMzA2LjM1NzQzdi0yNTIuNzE0ODZoMjUxLjkxMDA0djI1Mi43MTQ4NnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTI1Ljk1NTAxNzkxNjk1Mjc4OjEyNi4zNTc0MzAxMTQ3NzA2MS0tPg==';
    class Contact {
      getInfo() {
        return {
          id: 'samuelloufcontact',
          name: 'Contact',
          docsURI: "https://extensions.turbowarp.org/SamuelLouf/contact.html",
          color1: '#5cafff',
          blocks: [
            {
              opcode: 'labelNewBlocks',
              blockType: Scratch.BlockType.LABEL,
              text: 'Skype'
            },
            {
              opcode: 'skype_call_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'call [USERNAME] on skype',
              blockIconURI: skype,
              arguments: {
                USERNAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'echo123'
                }
              }
            },
            {
              opcode: 'skype_chat_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'chat with [USERNAME] on skype',
              blockIconURI: skype,
              arguments: {
                USERNAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'echo123'
                }
              }
            },
            {
              opcode: 'skype_show_user_info_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'show user info of [USERNAME] on skype',
              blockIconURI: skype,
              arguments: {
                USERNAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'echo123'
                }
              }
            },
            {
              opcode: 'skype_send_file_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'send file to [USERNAME] on skype',
              blockIconURI: skype,
              arguments: {
                USERNAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'echo123'
                }
              }
            },
            {
              opcode: 'skype_add_to_contacts_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'add [USERNAME] to contacts on skype',
              blockIconURI: skype,
              arguments: {
                USERNAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'echo123'
                }
              }
            },
            {
              opcode: 'skype_send_voice_mail_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'send voice mail to [USERNAME] on skype',
              blockIconURI: skype,
              arguments: {
                USERNAME: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'echo123'
                }
              }
            },
            {
              opcode: 'labelNewBlocks',
              blockType: Scratch.BlockType.LABEL,
              text: 'Phone and mail'
            },
            {
              opcode: 'mail_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'send mail named [SUBJECT] to [PERSON] with [TEXT]',
              arguments: {
                SUBJECT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Little Message'
                },
                PERSON: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'p.dupond@example.com'
                },
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Hi there !'
                }
              }
            },
            {
              opcode: 'mail_contact_block',
              blockType: Scratch.BlockType.REPORTER,
              text: 'person named [PERSON] with e-mail [EMAIL]',
              arguments: {
                PERSON: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Pierre Dupond'
                },
                EMAIL: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'p.dupond@example.com'
                }
              }
            },
            {
              opcode: 'mail_combine_persons_block',
              blockType: Scratch.BlockType.REPORTER,
              text: '[PERSON1] and [PERSON2]',
              arguments: {
                PERSON1: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'p.dupond@example.com'
                },
                PERSON2: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'e.dupond@example.com'
                }
              }
            },
            {
              opcode: 'call_block',
              blockType: Scratch.BlockType.COMMAND,
              text: 'call phone number [PHONE_NUMBER]',
              arguments: {
                PHONE_NUMBER: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '+33711223344'
                }
              }
            }
          ]
        };
      }

      skype_call_block (args) {
        open("skype:" + args.USERNAME + "?call");
      }

      skype_chat_block (args) {
        open("skype:" + args.USERNAME + "?chat");
      }

      skype_show_user_info_block (args) {
        open("skype:" + args.USERNAME + "?userinfo");
      }

      skype_send_file_block (args) {
        open("skype:" + args.USERNAME + "?sendfile");
      }

      skype_add_to_contacts_block (args) {
        open("skype:" + args.USERNAME + "?add");
      }

      skype_send_voice_mail_block (args) {
        open("skype:" + args.USERNAME + "?voicemail");
      }

      mail_block (args) {
        var text = "";
        var subject = "";
        var rest = "";
        if (args.TEXT != ""){
          var text = "body=" + encodeURI(args.TEXT);
        }
  
        if (args.SUBJECT != ""){
          var subject = "subject=" + encodeURI(args.SUBJECT);
        }
  
        var rest = "?" + text + "&" + subject;
  
        if (String(encodeURI(args.TEXT)) == "undefined"){
          rest = rest.replace("body=undefined&", "");
          if (String(encodeURI(args.SUBJECT)) == "undefined"){
            rest = rest.replace("?subject=undefined", "");
          }
        } else if (String(encodeURI(args.SUBJECT)) == "undefined"){
          rest = rest.replace("&subject=undefined", "");
        }
        
        var url = "mailto:" + args.PERSON + rest;
        open(url);
      }

      mail_contact_block (args) {
        return encodeURI(args.PERSON) + "<" + args.EMAIL + ">";
      }

      mail_combine_persons_block (args) {
        return args.PERSON1 + "," + args.PERSON2;
      }
  
      call_block (args) {
        open("tel:" + args.PHONE_NUMBER);
      }
    }
    Scratch.extensions.register(new Contact());
  })(Scratch);