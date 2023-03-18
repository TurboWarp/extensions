(function(Scratch) {
  'use strict';
  const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAGACAYAAACkx7W/AABFW0lEQVR4Xu2dB5hURRa2j4IIiAkDmEFRwRwwiyKYA5gFEwqIGDErhgVRUFEUFXMWRUHBgAJ9G5xFV9w1J9RddRGR6W7cXf7d/d1/dVfrr6/LYaHqzkxPT9/bN3zf87yPoXu661bfe6rq1KlzRCgqblqc2URqs90kl+0puczxmgFSyI7QjJWC95hmhuS9miIF7139zwUrUPD+pv+pLP6P87585qNln5P3Xip+dj5zk+baX7/z2GIbajNddXs2tZtJURRFNUVq5MpSmLOFNri9taEdpLlR8tmn9H+/qVnsY7ijxC+aP+v2vmYGIj0oYaAoDlQzO9mXSlEUlU4tmtdGz5x3/dXI36ENp6dZ6GNUk8afBKsJrCRy2RP1YLG9qJqWdvdQFEUlQ/lMZ23o+v7qOnleG8D5PoYxzfxk3E3ZZyXnXaH//Sj5bvY6djdSFEVFW/OntNIGbA8peJdowzZNU/AxeKQUct4f9YD5hO7LoVKYvYPd1RRFUdXV0pq1ijNWuDQK2de14fqXY8hIpfi7JqMHhZG6rw+R2ult7Z+DoigqOMFfXTurhzZEo/UM9X0fI0XC49+a2UW3EVcIFEUFor/M2UjP8AdKwZsiZhZqGyISDWr1b/S45LMnS23NuvbPSFEUVZqWZPfVxuRmbVQ+9jE0JPogJPUPxY33Jd6W9s9LURS1ovLZPSXnjdOG41sfg0JiTeYjPaBfJ4tnbm3/7BRFpVWIxS94t4g5/epjOEgC+aR4SA2nqSmKSpmQuqB4wtb72sc4kHQxv7iJvKSmo32bUBSVFOHkbSF7un7Y3/AxAoTgMNqL+p99eDKZopKiJd5OUvAm6Ad7qc9DT4gfiCa6mZvHFBVHLalpJ4XMEP0gv+3zcBNSOjjcV/BOK57wpigqwkLGybw3XvNP50EmpFlkcsWQUp4voKiIqdbrrh/SyZr/uA8uIRXl/2nuZwQRRVVTSq0k2LAreHN9HlJCwuBVff8dbN+aFEUFpQU1rfVDd7YUsl/4PJCEVINPpJA5RdSUFvbtSlFUJYRNuJx3nkS/KhZJL58X8xChqhtFURWQencV/VCdJemolkWSwWeSz/TjQEBR5QrLadST5WldEl/m64HgpOJ+FUVRJQizprzXnz5+kiA+1ffzcfatTlHU8spnegnTL5OkgkNlCFmmKGo5FeZsIfnsC84DQ0jy+KVY5/i7GRvbjwFFpUt/nbHGr0VXfvR5UAhJMj8UaxuzrjGVOhX9/JmB+iHI+zwYhKSJ74rBDtwoplKhYqnF7Hs+DwIhaeZt/WzsbD8uFJUM/S27puSzD4ip1Wrf/IQQ5LLKZW6lW4hKlgreMcITvISUygJZMvtQ+zGiqHjp+1kbSM6b6nODE0IaZ5LkM+vbjxVFRV8mfQOrcBHSPP6qB4FB9uNFUdFUMabfq/G5kQkh5TNHFmc2sR83ioqOMFNhNS5CggIr6v72Y0dR1dWiWe3p6yckLDJPF6PqKKrqynu9BYdZnJuUEBIgCyWX7Wk/jhQVjooFWjK36hvxZ5+bkxASPD9LITu2WDODokITCmLnvPd9bkhCSPh8wCL1VDgqeKcJElm5NyEhpGpk/6EnZSfYjytFVUZYZha8Ce6NRwiJDDlvnKialvbjS1Hl63tvQ31zvencbISQ6FHw5sqSmo72Y0xRTVftrB6Sz+Scm4wQEmVqi5l3Kaps5b1hmp98bi5CSPTRz272IvuxpqiGhXS0xURUzg1FCIkfz8iieW3sx5yiXMF3iOIU7k1ECIktmXmSm7Ge/bhT1P+Um72NIBe5c/MQQhLA11Kb6Wo/9hSFRG69hOmbCUk2Be9vTCFBrahC9nThZi8haeHH4jNPUZLLjPS5QQghSSfnXW+bAyotwsnenPekc1MQQtLERCaTS5sQElbwZvjcDISQ1JGdLgtqWttmgkqiltS0E5ZsJISsyBzJZ1azzQWVJC2tWUv/0G/5/PiEkNSTmVe0EVQChUMgyBvu/OiEEPIrqPPBA2MJk8nm+ZnzYxNCiMtnRZtBJUC5mZ300u4rnx+ZEELqQdsM2A4qxioaf+9b98clhJBG+ZaDQFxl3D5f+/yohBBSInolQHdQzGQ2fOnzJ4RUgs+4MRwXmVBPRvsQQioHooMYIhpxmUNejPMnhARAZh4Pi0VVSO/AE76EkGCZw7QRUdP8Ka2Y24cQEhKvMIFclMSsnoSQcJlomyGqGmI+f0JINWA9gSorlxng/CiEEBIWrCxWJZkavj86PwghhITHj6wxHLZys7cRFnAnhEQBFJqvzXS1zRQVhJbUdNSdvsD5EQghpHp8zdPCQat2elvd0e/4dD4hhFSbt3hGIEjlvUk+nU4IIVHhGdtsUZVQ3hvm09mEEBIxshfZ5otqjmpn9dAd+5Pb0YQQEjl+kiXZfW0zRpWjYl7/TM6nkwkhJKrUFgNWqGYI+Tby3ps+nUsIIdGm4M0VVdPSNmtUqSp4E5xOJYSQuJDzxtlmjSpFBe80pzMJISRu5LwTbPNGNaTabDfdcT84HUkIIbEj+4+iTaNKEHL7o/ya04mEEBJbPijaNqoR5TK3+nQeIYTEm4J3i23uqOWV93prfnY6jhBC4s/PzBxanxbNaq876DufTiOEkKSwUJbWrGWbPyrnTfXpLEIISRiZp23zl27lM4PcTgqIxTOVfPOKkj+9oGT+FCUfTlLy3lNK3n9aycfPKvnjNCXfvqokl3H/lhBCKkN/2wymU0tmddGd8U+fDqoMtbO0sddG/bX7lTxwjZLhZyo56xglJx2s5Ih9lfTaTUmPnZXst4uSg/dUcsJBSob1V/Kgfu87E5V8N9P9TEIIaR5LpTa7qW0O0yWlVtIdUePTOc3nq5eUvDJeyaihSk4+VMneOyrpsomSDu2VrNlOSdvWSlqtoqRFCyUrraRk5ZWVtGxp/v86ayrZalMlR/dUcu9VSj6d4n4+IYQ0i+xrRRuYWuW9wW6nNJMvpip56gYlA/sq6d5NyYbrKWnXRht6beD1kFMyGBQwGHTrrOSagcZFZH8XIYQ0i8ygX61hyvT9rA2kknV94bOf95iSy05TssOWStZYTc/qV3INe1PBwLHZBkpGDFHy2XPu9xJCSPn8VQ8C60vqVMmon5zmtw8qGaRn/Rusa9w5tiFvDvi8XboqmTiKm8OEkEozSVKlgneMTyeUD9wz2LiFfx+uG9uAVwK4g849QcnHk93vJ4SQ5rBk9qGSCv0tu6a+4MVOB5QLonQevFbJ9l0q4/JpCEQLvTjObQMhhDSPP0s+s5okXvnsAz4XXz6I0DnneCWrtXENdqXZaH0lt1+iZPEstx2EENIckAct0UKdzLz3i3PhzWHm3UoO3D0418/ytFlVyfknKpnPzWBCSMX5j7aRO0sipUauLIXsez4XXT61GSUPXatkm86usQ4CDDJH9VDy2gNuWwghpPm8ncyzAUGke4D//7aLlGzS0TXWQdF9GyXPjmE0ECEkGHKZAZIoff/S6vrC8s6FNhcMADefbw572YY6KDptqOSuy01OIbs9hBDSfL5L1oYwCiG4F9l8YISxKYuDWrahDoq111By3WAlf37ZbQ8hhFSCXGakJEKFOVvoC/q3c4GVAHsAD1yrpGsn11AHxSotlZx9rJJPeR6AEBIY/1e+m7GxxF757As+F1c5ptyiZI/tXEMdFNgI7ru/krkPuW0hhJBKkcs8IbGWKfHoXlglQZrnQ/d2DXWQ7Lm9kufHum0hhJDK8bPUet0llkLYZz7zkc9FVZYPJik57XAlLVu4hjoott7M1AtArQG7PYQQUily3hsSS6HijX0xQfDVi0ouOUXJ6qu5hjooOqyj5OYLlSya4baHEEIqSSF7nMRKakoL3egvnAsJAhjhm0IOBW3TWsmVA5QsmO62hxBCKsunRY9KbISDDO5FBAMOZMEdE2YkEJLOndlHyUfPuu0hhJCKkzlJYiH17iq6wV+7FxAgz99iNmZtQx0kqB/s3eO2hRBCKs/8eKwC8tmzfBofLIgEOnyfcBLC1bHjVqb0pN0WQggJhEw/ibTmT2mlG7rQbXjAfDLZVANbdRXXUAfFxusrufMy5gQihITFZ9FeBeS883waHTzYCL52sJK1VncNdVCg5vDIIYwEIoSESPZkiaQW1LSWSlb6aiqYjYeZEwgpIS7op+RP09y2EEJIMHwezVVAITPEp7HhMfEGJTtt5RrqoMB+Q79DlLz9pNsWQggJikLmFImUUMAgrLj/+phxp5IDuruGOkjwfa+Md9tCCCHB8YlESnmvj08jwwUz8RN665m5j6EOCpw9eOQ3blsIISRICpmDJDIqeHOdBoYN8vOjOHyLEHMCdWiv5JYLTWEauz2EEBIUBW+GREK52bs5jasGCMe8/mxTsMU21EGxelslVwxQ8uWLbnsIISQ4fpHabDepuvLeZJ/GVYcHrlGy1WauoQ6KVqsoGXy0ko+ecdtCCCGBkn1AqqrczE66If9xG1Ylpt6qZK8dXEMdFMgJdMwBSl5/2G0LIYQEy7+ktmZdqZry3nifRlWPmgdMSgjbUAfJ3nrAmXar2xZCCAmczLVSFX3/0up6CfIPt0FV5MNnlJxyWLg5gTbfSMm9V7E4DCGkGtQWU/CErmokfWuMr19SctHJStq2dg11UKyzppKRZ7M2ACGkOhS80yR05b23nYZUG4Rjjh1mErXZhjoo2qyq5IKTlHz2nNseQggJmkL2dQlVhVk7Oo2IAjnNk6NMqmbbUAcFzh3A7cSUEISQ6vCLfD97KwlNBW+CTyOiwYy7wk0Jgf2GQ/dWkr3XbQshhIRBwbtZQtGieW30Fy51GhAV5j2m5Ljeema+smusg2LXbkomjTErELs9hBASPLWialpK4CpkT/f58ujwyRQlZx2jpHUr11AHxSYdlYy/VMlipoQghFSNPhK4ct4bPl8cHRa8rGT4meEWh1mtjZKrzjD5iOz2EEJIKGRelECF3BPYcHC+OEIgHh+z8TCLw8DdhJQQKE1pt4cQQsLhJ1lS01ECU94b7fOl0WPyzUp229Y11EGBFNRICfHGI25bCCEkLHLeFRKY8t6XzhdGkdfuV3L4vuGeCN5/FyXT73DbQggh4fGpBKLazK4+XxZN3ntayamHm7q9tqEOim02V/LYSLcthBASJrnZ20jFVfBucb4oqvzpBSUX9gs/JcTNF5i6BHZ7CCEkLArZEVJRoeZv3lvgfFFUQUoI5OeBUbYNdVBgtXHxySYfkd0eQggJjwrXDM5n9vD5kmhz/9VKttrUNdRBgf0GpIR4d6LbFmLAQTmEyuKw3jNjlNx+iZJRQ5VcN1jJb85ScoP+93EXKXnieiUz71by+yeUfDGVJTcJaSq1ma5SMeW8cc4XRJ2Xbley706uoQ4KpoRomG9eUfLKnUquOF3JkT2U7NJVSeeNlGywrpL125v6yhuup6TThkq276Kkx85KjtLvO/0IJSOGKHnhNiWfTlGymGm3CWmUgnedVETG/fOt8wVR5/ePKzm2l2uogwShpwhBtduSdv44TcndV5gcTTD2cJc1FqGFamstW5hsqxgY9thOSf9DzD7L3IeUfPuq+z2EkF/JfCQVUcHbx/3wGPDHqSYlBIyIbVyCAsVh7hvutiXNoE4C3HG7bN283wIDxqqrKNm0o1lB3HyhcSVxRUCIPxXJEBqn6J/lWaRniFcOUNKujWtMgqL9GsanzdmpAaeyX75DySF7GeNt91e5tFrFDLZnHGU+fyH7mxCX7DXSbGEp4XxwDEA45tgLjY/ZNiBBsWorJeccb3zVdnvSyEfPKhnWXw+MAURjYUWwth5w+/Y0+z0syUmIzdvSLP1lzkYS9dw/DfHoCCXbbuEaj6BYeWWTEuL1h9y2pA0YZET67L5d4/7+5rBGOxN99dsHmY6bkBX5WWpr1pWylc8M8vnQ+IBQwl67uUYjSPbbxcxI7bakDZyHuPpMPUsPISvrBuuYMNI/vuC2g5B001/KVsF7zucD48MHk5ScfKiJKLGNRlAghBFx7Gk/EfzORBO1g1WR3UeVBt+BsNGptyL+2W0LIWml4D0uZQnVZaJc+asUvnrR+KDDTAmxSQdzwGlRyg8voTRnmKsvbMBfeqqS+c+5bSEkvdQWQ/mbrNpZPXw+LF4gGuf6s5Wsv7ZrMIJizXamIM1XKU8JgcR4Ye+/7LaNkok38OQwIctTmL2DNFl5b4zzQXEDG5E4gLTFxq7BCArEup/Zx7if7PakBbi/xpynZJ213P4JknZtlQw5Rsl7T7ltIiSt5DKXS5OV8953PiiOIBKl+zausQiSI/Y1NQnstqQFlOVENtbmHPwqB0QbbddFyUPXKlk0w20XIelktjRJi2a1lziHfy5PzQNKDt/HVO2yDUZQ7P5rSoi0bgRjA/ikg91+CQOkjjj9SCVvP+m2KwngnsLKduErJu050mwgwR7cXtgAT+s9Rxri31I7va2UrHzmSJ8PiSc4jASXDE6P2sYiKLpsYlJCpDVNQdgbwDZb6v6/6/LknBDGfYT7eOpYJbddZDa7cQr6xIOUnHCQiXQbdLT5/8iVhPMv+A3gCkMqDg4KpOAdLCUrCf7/OhCPjpQQa4UQj17HemsZH3ha3RBP3aBkp63cfgkLJJtDIkAcDrPbFjcwy392jJLBR5uEeJttoGSN1ZS0sNxrcLfh/yMKbbstlPTYyfTBZacZl9ic+8xqgYNBOsllRkrJKnhznQ+IK99pIzx2mJKNO7iGIihat9IP3qnVKQ6DBxyplz9+1mTNRK4cnEsYf5mSG89VMuocM4usmyV+MrnyKxXMvmGo7H4JE3w/ZsNfv+y2Lw7gVPPHk81vtc9Oxrjb19gYGCRQFGnbzU0+pktOUfL8WDMQ2N9Hkk5GStL8Ka30m//l8wHxBAbx4etMzV77AQkKbEaeeliw0Si4LoS5omAK/N0w5o/8xlRCQz6ifgeb+gT77Khkhy1N8jTkReq4jjGOmCX23NW4xxCy+flU9zvKAase5O8Pc8XlB1YB2IyfNSF+s160F78pCuXgvq1EbWsMBuvqleneO5rfB8V2eGguTfxd1MiVpVHls3v6/HG8QTERGEL7oQiSnt2VvDLebUtTwewcM3oYegwoGW3QHhthXEw45Hba4UqO2s+koIBRR2EVHHyD0UBsfEN5eHBCerU2SnbuqmS0/ryPnnG/v6kgER5CMcPcc6kPDHjXIUVEjGa8+L1rHlRy/olKOm+oDXeFT1Lj8zABGHq8cQtVevVHIkx2e2lUBe9S9w9jzhsPKzm6ZzhpCerAzO3xkW5b6gOzPsyev3xRyYfaEM+5X8mTo5TccqGpojVYG9XjeplZO9JNbLS+ktXbllZcpTEwEGy9mZJxF5vvt9vWFOB3x4DU3DZVAhi7/XV/vTguHqsArOiwkkMUU4d1gutDfC4mClgpvvW42w6STAre2dKo8t405w/jDmbPuNnhm7cfhqBAFSukhPBbZtcZe6QteO0Bc1bhzsvMkv+8E5T0O0TJQXso2XErUwAFflzM6u2Nv0qCTcQD9zCrluYYS+Tj2WsH9/OrBfrucj2Afva829Yo8c10JVNuMRu3YRygwyCAA5IY9LHCtNtDkkdJeYHyXt75w7izeKbxjcMY2A9CUGB2fu0gE6ONnERvPqrkubEmPBSbsRefbNIYH7ynkl27mocR5RIrNasvB8wKkVUTkSd2H5YCBg5EnHTt5H52tUA/InoGkTR+g3EUwKoL+zAY9FcvY7O3XHCfIWEf9gPsNpEk8idpUPlMZ58/SgYTrjQbofZDEBSYUcP9AD/9gKPMYTTkxoerBb7pahr6+kCb++5vDs/Z/VcKWNUg8garH/uzqwmMKlaAcK3Zba42WAUiQmvP7c0hNrvtQYNT8hgc7XaRJPKL5GasJ/Uqn+3r80fJYNJoPdPu5j4AQQK3DYxP2CkRmgP2F7B3Uc5sGTNZxJ2XE7IYJBhk4U5DlFRUzmZgtfT+00pGn2uitCoR6VMO662tZMz5zXP7kfiQyx4h9argXef8QVJA9MyBu7sPAFkRuMkQJogTpHYfNgYS4A04MpoDHqKdBvaNRooIGFu4BLE3gRVhNfsLAw/ckaxjnRIyw6VeFbwp7h8kBBgnbK7aDwBZERgjpBn4cJLbh40x+15z9sD+zCiAVUC3zsYVWM1NT+xHIcJryLHmcGKYkWl+4PvP1m35ssx9HxIzMk9LvSpkv3D/ICEgeRb88dVaaseJw/Y2MeJ2HzYEZrVP3WjOFNifFxUQBYb8Oa8/7LY/DHAPIiQVExFs+NvtqwYYAIYeZwIV7PaSJPKx+GrRvDb6xf/6/EFywOEp+Dzth4CsCE6LTrvN7b+GwMwWoaydNnQ/L0rgEBRSg5Tj4moOSAvy9I3mdDKKBtntqhYtW5oUEUiZYreZJJEfRb27ijiq9br7vDlZICUE3AD2Q0BWBBumqKxl919DYHY7cki4obblABcXDqrBDWNfQ1DgJDLCY3E6vF0bt03VBKU0bzjHbTNJMJntxFE+M9B9Y8LA8nvfndyHgKxIl42V3D/cJCSz+7A+cHbggn7hHrYrF4Sp4lxIGH5vhHnecYkpVxnFvsGZDQxOdrtJgsn0E0f5zB3uGxPG6w/p2V8P9yEgK4LTx8jo2ZQBoK4ITJTONdQH/N6oVzD9juDCH/G5yN104zkmzLOakT4NgQkRJkZ2+0mSGS2OUDbMfWOyQOpj5FmpdIKtpAE/PqJlmjIATB9vDr7ZnxVVsBeEOhGYodvX0lxg/Oc9ZsI8t9w0usYfVfLgDkPacPsaSJJ5SRzlvYU+b0wWSMuAhzJqB5WiBhLZPfobt/8aAvsrUUoB0RhYBSDP/pSbTYlF+3rKBZ8190GT0wkrqWqHeTYE2nb6EabamH0dJMl8LSsIu8JJjwACSH2LY/dRj1SpNj12VvJSE9wCmPEiBcT6MYuwQs0CpF0u58yDHzhMhWR6SNGNugtRd4fhpDoigKpRuIhUk/+Iqmkpy1SYs4XPm5IJMm+GnRIiTiCPP9xk7050+64+EAGElVU1ctk0F5SuROqL5ubFR1jpc7coOfoAJWuv4X5PFEFKcYTEoqC8fT0k2eRmdpJlynu9nTckFVSIQtrjqM/OqkHdadl7rjRG3e67+oAffVDfeO6t1KWIwCa2fV2lUpfNE5ld4+ReRLgvak40Za+HJINctqcsUz4zyHlDUkHqW5wGjerGXLWAP7jLJiaF9XtPu/3WEL97xBTcsT8zLnTrZMJeyzkMhRj/e68yh+fitgLqvZuSmXe710SSTy4zQJYpn73BeUNS+fx5JeedqGd+rd0HIo1g1o+MpSgpiQLk7z7V9E3RqBWBaSqIz0cNZQxk9rXVB/Y9kF4aLhS4FKNQArMpYLV2woGsCJZWCtkRskz57FPOG5LKtzNM/Vvk5LcfirSA8L9WLU0f7L+LyQY57dbyDkbBECJkFPVr7e+JE6gVgQGwlBQRuOY/6JXkNQOVdO0cz9Vka71aOfs4U8PZvj6SBh6VZcp7v/N5Q3JBmoOdt3YfiqSCWT5WPJt0MNcNXzX83qg3/NLt5nxEuZugiHxBFbG4bHzWB2bwcGPNvq/hw2Gok4CVwkUnm0EvymGeDYHf62o9gC142b1GkgKyr8ky5b3F7hsSDCpeHdkjvg9vQyDbKfLxbLWpqTKFgz7YoL36TJOsDYVxsBGOU6qoQ2v3TVNBveXzT4qf/9uPjdc3eXGwqWtfJ0C0TPZeJYOPVrLRevEOJEBSvDsubbq7jySFP0tR5gzAzz5vSC4oEH7OCSYO2n4w4gAGLvit269pzjTstLWJbMKhnqvOMK4MHMyCbx5F5+GrRqw3DFhDs9tyeOdJJScfGk83iA2u4SC9OnrlTref6lI5n3SQknXXMm40++/jRLEU5E3u70nSwk+iprQQWVLT0efFZANDiFw3KMRuPxhRAjPMVVcxB5YwO91uCyUH7GYKecMFgb0MRKBgVo9oDpQYhKEKM6zPu0fJIXvFeza8POtp4z78TBPdU3eNGDxR6wB1ndeMUZhnfay8klkBl1v7mSQD2H7JzdrWeSENvPGIkuN6R6dADKIyEJOO07RbbqJknx1NuCpOql43WMntlyh5/HozO0XkBlwv8L9XewmPHPdJ2k+BcUSCtKljjb//T3ogePAaEyUV1xWjDe55HPbDhMH+PUl6gO3Xs8X9nRfSAIznPVeZg09hzl7xXXA1tGtr/LDw0/fd3/iVrxhgUio8oA3OC7eZhGI4ZIUZKIqZ226JaoON43EXm9KG9nXGGay4hvUzM+TxlyrZfdv4hXk2BCYaqI6Hwc3+TUl6qM3shzKQxzovpAXkgEFGSETHVHIQwGfBTw+jAUOPDUPEisOFgDwxF2rjcv1QJfcOV/L8WJM87KNnzOZjFGb1pYKBCf0XRoUr9Gklf6OGwPfA3XZcLyXbd4nOKrFSYA9j1FAzqbB/U5IeCt4xOANwlvNCWiim7X3UbJxuu7nxt9sPS2MsP6NHbhXkfkeueRyyQa1VxIpjFvnsGBNiiOgbFE9JQv4VbC4jwqicfmsK2HBFlBFi1+3XggJGHxvtSYwUQ4rq+4a7vydJG4ORBmK4zwvpAX7eDyaZzVREsyCiBjMkv6gWGAMsn3GACimTkU4YYZYDjjLJ0OAOmThKyat3mljxj581B4vwHfb3JoE3HlZyzAHBG0kMsjBaSFVhv0aaDvaX4GK0f0+SLnLeldgDuM15IY3AUL/5qDkkNvpcJRecpOQMbdhPO8KEV+LgFFJI4PAMwiwfHaEfonHGT4zcOUmZ1TcFVNTCSWLbwFSaFi1M1AoOagW92kg6GEwxaL/5mPt7knRRyI4VKXiPOy+kGczW4YdHGCAKZSBSAiuEjyeb//fNK8HE08cNXP9jI4yv3DYylQauGAy+I4aYcFj7dVI6WNkOOVbJ51Pd35SkjOwj2AOY7r5ASCNgA3HMeUo6rOMamUqDTWakm3j5DnPmACsC+z2kNLBXNfwMM8mxf1OSMjIvYgUw132BkEaAy+uCfmZ2bhuZSoPqWrcOM2cfkNICezT2e0hpYP8KGUzTvoIliAKaizxAv3deIKQxkDYaJ5LDCM3EiW1ErcA9h7BZbL7jwJb9PtI423RW8kgT6z2TpPIHbAK/7/MCIQ2DpGhwx9gGJghQuQqb8/jez55TcvEp4Zw9SCI9dzV1i+3fk6SRD7ACmO/zAiENM/lmJbtt6xqYIEAaBvj/8b1wXSD3Ees6Nx2s1rBqw1kU+/ckaeQzDABf+rxASMMgjQaKqNhGJggQ/rl8tS5EZw093pzJsN9L6gf7NUgBgRPc9u9JUkjmKwwA37ovENIASFWBqJzV27pGptJg1jqwz4qVq/D9j480p67t95P6QaZTpCBhBBAxfIsBIO/zAiH1gyRiZx8bzkbsqq2Mz//PVuUqnM9ASUPUM7b/Ji4g3USYeYawmX73FeVXfyNJo4ABYKnPC4TUD05M4zSpbWCCAJk5kQ7bnrXCiGFjGHsBYUQiVRqsnjpvpGfla7uvBQX6CvsnDAElhqUYAH7weYGQ+sGGLDZmbQMTBIhbR+1ivzQbSEZ33gnxiwhCYrsDd1dyymEmJbj9elAcupdJSGj3I0krP2AA+K/PC4TUDwrTIE2ybWCCAAngsOHslyIbqwDMaJGvPy6rAKQIRygmYvFxqA0FgOz3BEHLX4vAIK2J3Y8krfyXAwBpGnAfoDoZUl/bRiYIdtADzRMj63dbYHMY5THhKrL/Nmpg5o+V0xN6AH13opJzjg/nJDXAKgkZa79iBBBZRnEAoAuIlM430039hLA2X/feUcm0W9121IHTwVNvNaeDo7wKgPHHzB/GHxvarz9kKsGF1WYk0UMKCBaBIf+j6ALiJjApHUTfDDgyvOiVw/ZRMud+tx3LgxxBKKfZfk3376MAZvkw/nCdIQY/p9s85WYle2znvjcoUL/i4euSW5uClENxE5hhoKR0vHtMCogwZq74jn6HKHlnotuO5YFRe3GcMbItAi5O01RQxaxu5l93AAt7FxOuVLL5xu77g2LvHRpeSZE0kudBMNI0nr1JyW7buAYmCFD8BX5y5P+x22GDWg3XDFKyfnv3c6pFuzYm2ufJUSueY1j4qpKRZ+sVyxru3wQBBtKjeij57YNuv5E0UzwIxlQQpDQQiYPSmSjPaBuZIMDGJfYbSkldgFXAK3ea1UlY7qmGWEO3/Yh9lTwzxj3EhmIs554QXjtxmO6sY5R8OtntN5JmvmQyOFI6C19RcuM54RSBAagDMOZ89xBYfXz1om7fudWvGoaBCwflsDmNTXO7na8/bDaA7b8LirXXMKk7vuUGMFmB+UwHTUoHbpYL+4eXhA3J5pqSugChoq/db5LHId7e/rwwWGdNJf0ONimX64u4waogzGymnTY0/Wi3g6Qb2H5hQRhSKm8/qeSkg8PbaEW9YdQdru8MgB/wr+OcAtIs2J8XJPCzY8WCCClslNc3aOFa7rxMySYd3M8Iip27Knn6Rrct1QT9g98K7j1EcX0yxRQZmvuQqTWBPgQ4uYxMsDjANv85U4luwXQzuDblviB+/J4lIUnpvHqnkp7dXQMTFAiTfO4Wtx2N8btHTfRQWIesYPzhdhp6nJKaB+o3/gDurGsHh5NJtY7euymZeZfblrDA3hGM9oeTjFHHYHTPlUpuukDJ1QP1qrKf2aNAaow++5t9nDoO21vJsb3MwIqAgEtPNRvoGORxmvql25W89bhZnS72SRdC6seUhGRReFICmG09NjK8FBCg9+5KZpRhuDA7RAnJrp3czwyCzToqufhkM1P1S1mxPJ89b7KYtgypsD0GpxMONKs3uy1BgtxNyNUEA43AAexBDD7a5CPaeWvj3sOKCfslGKixqlzJp/3LXwc2zeF+hJsNK6hunZXst7MZ7HHKGW4uBAJ8/rzbHuKDtv16FHjcfYEQCzzQt10cnusCD3zfnmbD1G5LKfzhCSWD+gY70155ZRPLf+UZ+vueLO2QFVwcYZ4AxkBz3omlRVI1F6xu4MZBtbibzlcyUPd/j52NsUeqjlYtg7luDB74nbHX0Ws3kz4cmWKRbsMviSAxwPZLzrvNeYEQm29eUXLNwPBy7mC2N+Co8pOX4cHHmQXMEIMIt0RyNZyuhTvi/UnmdK/dBj/Qpu4hbgAjAmjU0GD95V++YPz22Ns4s48pFbruWuHtFS0PBph2bU0daaw4Hv2NOUjICCgX2H7JZ4Y7LxBig406uC6CMKZ+tG2t5BI9k/vyRbctpQK/MNwCiLipZFQQDqjhM8deqOTjZ93vrQ/sDcB3vXFIqyiw9WZKHrzGbUslwKpitjb8o89VcmQPMwOvZD83F9xDcFkOOtpUkPtkcrADYezQtl/y2bPcFwixCLMIDMAp2RvOaXhDtRTgc0fahb12qMymMIzK/rsquf9q89n29zUEDCYOtq0RUiI9EEQKCKyu3npMyW0XmU1bDGhh7Wk0FawIVmttBmysYJGEj26hX9G2XwrZY90XCLF4fqySPbd3H7CgwF4DXAp2O8oBqwgkYkNECQaWcvzQcGdg0xIRKX6ne0vho2eMWyLMWTJOI1cqBQRmz9hgRRTPaUeYUNuwVoTNBfs1G65nIo2m3WaikuzrSxuw/ZLz9ndeIMQGRVnCTF6GCA+E+dntKBecYp4+Xsn5JynZaWuzaQijYH+vDQxch/Z61r+LCVlEXHp9B7waAyGiR+0XTi1lgO857XATjWO3palgJYZZP1Zlu29n0lvb3xcHsD9wyN6mkFA5g3iSgO2X3KxtnRcIWR48/HjwEX5nP1BBgY3EyTe5bWkOCNHELBwbg8jFc/CeeqDZ3NTlhWsHxh6RKjASWIF030bJ8b1NTWJkG8WeQnN8yGGfAMY1ISKmuRFAGDxn3m3OOXTaoLSBM8qgXw7d26wE0uwOgu2XJTUdnRcIWR4sl2FIKuFDL5Ve3c3BM7stlQAPPSqJZe5R8uC1SkYM0SuDE81mIVw0qDCGOsQw2Nj7KObwb4bhr/vOcReHm6cIVduwUd0cI4fTujCUx/UyE4By3GdRBOcPzjhKybxH3WtOC7D9ot5dRf/Hz86LhNQBY4nwvrBmfjAyffZTMvdBty2VBoYd8etIJIdIJwCDD6PZXKO/PEhhgMNKYW4AIxQSqajLvQ6E/iKhHVJJI7W1/flxBofOsIcx/rLmBxrEk5+Ltr+ovLfY5w2EGHDCFQnW7IcoKDAAnHqYqT5mtyWuvIdKakeFu2mKQ1HlnKQG2OfAKV7sWYSV/C9ssBl/7olm8LevP/kslmXKe7/zeQMhBmS2RFUr+wEKCqw04KNvzhmAqDHnPiWH7xueCwVRS9i/mPeY25bGwIwYm939Dwl3xVINkEai3MOG8eZ3skz57FM+byDE8NQNSnbayn14ggIFTIafmayl+bNjzKayfa1Bgf2as441h5/stjQE3EUYNIYebzbH7c9NGscf2HjJ0USibf4y5bM3uG8g5FdwknSrzdyHJyhQ1vHWYW474sqyDeAO7rUGBVJ2YBBtaqgj9kCuH6pkk47hrVaqRV2YbFMHyUSgbf4y5TOD3DcQ8iuPjlCy7ebuAxQU23UxRdTtdsQV+JiR1iLM2PnNNlByx6VNW0UhXw5We4jzT7rxB1glDeuf0kNh2uYvU97r7b6BkF954TYl++7oPkBBgTTQiDu32xFX3nvKbGqHdQAMIOEc3E52WxoCIa9oZ5vW7uclEYTJYqXZWArvZNJblqkwZwufNxBiePsJJScdFE4YKL4Dx/WRVthuR1xBpkwUN7GvNSgwez98H1Me025LfXz9ssntg9TN9uclEfQRUlUj0snuizQAm79M5izAf503EQKwREYahDBSQeOAzvCBTfddR5mnR5siKPa1BgVCTeHbxsrDbosf2PjN3mfOXoQZplpN2rYx2W1T6f/Xtn7ZGYA65b2FPm8kxBgIlGbcZ0clLQLM+ohZGerXophHKcVV4gD6DjNrJJKzrzcokOrgwv5K/viC2x4/MNjefEF4xX6iANJkI79Vc05Jx5eF4ijvzfZ5IyEGRIegsAhywQS1QQjDhRPHYZcvDBIYV2wAh5kBFCkbUKim1KR1bzxiwiGjmtK50iDM+MSD9HWXWW0u/swWR/nMHT5vJMRQFx+OAt6bdqx8tSd8HuLkHxthUjPY3x9XEGPe/9DgBk0/umxs6vDabfEDK62HrwuvfnIU6LKJiZBCqgu7P1KBtvWO8pmB7hsJWQ4YCyTPQnZMZOvEKdFKRLbgM7D5eMPQphdZiTpIxYCoJvuagwSuOkRu2W3x40/TTEH7tET+IK3FqYeXd0I6MWhb76jW6+6+kRAfPp9q4sWHHKtkj+1MvnyUSSxnlovaultuquSqAcly/dSB4ilhbgADVG4rNcslIpSQGtn+jCSCiQbScT8xKq2+fwNsvaNF89oII4FIqeCAEerhItb8mkFKTj5UyX67GGOOqlvws9bnJsKD2HpVc9r0oD1N6mVErJSbtTLKoHQkXA52HwQF/PiDjzGVu+y22KCQPYruoPiO/TnVABk6cW8gFLicyURjoCIYotnmP+f2RXr4b9HW+6qQ/cLnDwipHxhthIkiodYrdyqZcIWpe4u8+thoQ7Hwg/ZQckB3k1AO/47MomcdYyJPcOALJ2VhjOzPTgJhRwDBxXHlgNL2UTCI33S+knXXcj8nDGDs4UbE/kPP7ibz6HG9TRK7vvubKmyYJFRic7r9mibAABu/SZxolApsfL0qeFOcPyCkKeDhQvTJly+Y6lsoI4gDSZkJSmZNMP+OjVHkxy/m3Pf5jKSAfvjNWeZsg22QggKDDVZUpRi5aqSoAJjhw22ICcEFJ5lVEu6N3z9hUoBjMgF3IPZPUIkOaa2RmK6cg4hYSWCAQ2ZTfF5TUmMkEdj4elXwrnP+gBBSHighiVwzYRrYbTYvvZbyuxPNhmh9rrogwGx+606m6hoqvhVXfw0MVgijRTpyDFR7bW9CXEsdCPBdnTc0e1WYgJQaFptkYOPrVT7b1/kDQkh5fDzZuLrCPAMAV9urd7lt8aOuSH0Q/vb6QJK6awebQvUNGf7lwfs+e87UiMZAgFrOcButvYb/4IXTzPD3I/rqRr2CeOvx5BwsbDbaxterfKaz+weEkLLAJjn2QsIaADDjPf1IY1zttvgBlwjcK/bnBAUM80kHG4Nst6UUYMThOpxzv3EbXTHAuHYwIOy3s9kzQA6kAUca11HdCsP+nFSjbXyDynt5948IIU0GLiC4OnDC2TaGQYBcTYhy+abE9MYvjlOy707u5wQF9kJwhqQSIZjFvaaZJqIHtaMxmCGgAPH96Hf4+pO8v1QeeWlUeW+azx8SQpoKDN3YYcYdYRvDIIBbBDPjUjc6kQkTGTHtzwkKRPxggColQokEwTRpVAXvUp8/JISUQ7GWwk7B+9mRpA8ht6g9bLehPhC2iz0D+7OCAi4qhHii7oDdFhI8sO2NKp/d0/lDQkh5fDpFyeWnBx9rjzKa1w5S8mUTfN7VOAWMuH747hHmWQlXEGkC2rY3qvlTWuk3/8v9Y0JIk4EfGoYW4ZYw0kGsBDCzxkwePv1SI2sA/OUnHFiZfE6lgu/qtKGJjkLZTxzMQqbZha8a1xWqcxXJGHA9K+BzHaQU/lW07SWp4M31+QBCSDlgpuvpQWDo8Uo237jyRVcQWnnjuWbz0/7uhkAxFBjiSrenFHBiGWcWkIb6yjOU3H6JkoeuNYMC8kwB5FGaNFrJM2NMCOiUm5VMvVXJ9DvMwTFEA2EA+cMTSj56VsnXL5W+/5E2YNNLVt4b43wAIaR8YJhgqMacb9IeFA80VWDmjc8Zcow5cW1/Z2MghQeqr7Vr635uWGBFhINyWB113shsZG+7hWE7zQ5bKtlxK5NQb5eupmA9Nq6RUgR7HljBnH6EkvNPUnL9UCUTrlTy5Cg9UIzVgwSigh41K4zFqXc3jZGSlc8c6fMBhJDmglnqy3oGe+lp5qASTqrCAPsdaGoIbPqiqDny28y+r7yDTnCp3HW5qe9gf35cQAI5DCJYxbTTq4r11zbJ97p3M/3b72All+m+Hn+pkmdvMn313tPmd0hVMXht00vWolnt9R/94n4IIaTZwI+NIuzYG7j9YiXnHG9msyiIs8XGSjqsY2L6cX6gVUvj4wc4ULb6aqZ0Iw49YdMXLpDmGDK4VnbbxjWsSQEDBAbXtXV/bt/FHBTD4bzR5xqXElZlSDeR7L2FX4o2vUnKee/7fBAhpJJgFo7ZKDZkYZDGX2YOS13UX8nAPiaj6rEHKDmulzn1isECbiT4wXEq1v68poIB5JiewWxORxW43jDAojbAGUcZtxH6f2FCK4TBljdZ3AcgJHzqsqnCPw/fNTKqolYCsmQitURdFlX778oFqRIQplrNfYBqAtcRXEbYR8AGdDJrBTTB/1+n2lk9fD6IEJIkMOA8NtJsuNrGMU2goh02mZFDCG6h5rjVogZseZOlalrqP17qfBghJFnA/YEkbdUIB40ScINhQxwRRciUmoz00UuLtrwsFbznfD6QEJIk4G5CdbaN13eNYtrApjGKzww4ymzSV9LdVg1gw8tWPjPI+UBCSLKAGwgFUxAhU4nyi0kAqTuQVhoV7GLtDtI2vGz9Zc5GwnBQQpIPNoPHnGdCTG1jmFZwyO7s40ypyqak2IgOvxRteLOUz3zk88GEkKTx2wdNuCk2RG1jmFawJzByiKlIZvdX5NG2u9kqeLe4H0wISRwoJHPvVSZHT5rOBTQEDpHhoNyjI3T/xOycAGx3s1Xw9nE+mBCSTJBU7dJTzUaobQzTCnIV4UDe3IfidWIYtrvZUmol/WHfOh9OCEke8HUj+gWuIGTstI1hWkHGVZzAxqltu8+iybdF210R5bxxPl9ACEkiKNmINMzIWhpWPeOoA1fQwXuZaCm7v6IIbHbFlM/s4XwBISS5IEHaYyNMOcvWrVyDmEY6rqNk1NCY5AzSNrtiMm6gBe6XEEISC9wdD19n8u/THWSSyB3bq7zaC+GyoHLunzoxGoiQ9IGVANxBffY3h6PSHh2ElNJYGUX5XEBFon9s1WZ2db6IEJJ8kA4hc48pH4l6BWk+J4A00igwU4lU3EEBWx2I8t6XzpcRQpIP0iEgS+YtF5pKW1gNNLWKWRJYWV/zEfuaFBF2H0WDLyUw5b3RPl9ICEkLSBw3fbySS04xVck2XM9UKkuTawg1ilE7IJpuoNESmGqz3YS5gQhJN3VVzFB0HWkSjj9QyR7bmbQJKCyDhHJJHhAw6CFvEsJl7b6pLr8UbXSgynlv+HwxISSNYH/gk8lKXrpdyU3nKxnUV8mhe5tZMgzl6m1NnQFE0NiGNK7gbMTQ46OXHwi2OXAVsqc7X0wIIdgn+PIFJW8+quTpG5Vcf7bZOO67v5L9dtaDwpZKNtOrhDXbxXuVgHYjKuqNR9w+qCawzYFr0bw2wkphhJDGWDzLpJlGPWOkl8CggE3k8080uXUO20dJz12N+2gHPTh07WTq83ba0BSn6bCOScmMyJt2bZSs2soMHFhNVHvwwNmIl293r7l6LC3a5lBU8Cb4NIAQQhqm9tei99hDQOK5Nx42m8oYHB68RsndVyi57SIlN56r5LrBSq44Xcmwk43LBQVajuut5MDdTf1e5OfBAbVqDAY7baVk4ij3+qoFbHJoKsza0WkAIYQESdHF9KJxMU252ZSxRC1jrBqwOrCNdJBstamS+66KTrUw2ORQlffedhpBCEkviA6qw34tCGB8352oZOwwJbttq6RliEXtsfoYd7GSxZGoGfy2hK589iyfhhBC0gIMPc4FwMePkFC4RB64RsnjI5W8cJuS3z2i5IupwRdWx6rgurPM4TTbUAfFxh3MwBP0tZWEtsWh6/uXVtdf/A+3MYSQRIOiKKgehiiYCVeaurk4FLbR+ibsc/21jY/8hAOVjDjL5BLCKWL8TRCrA6wE7h+uZMtNXEMdFNikHnthBAYAbYNhi6uivDfebRAhJLHAgM9/TsmTerbf/1Bj9JEewTaQYCUx1bRQYnJgH22krzargkqnU8YAgKyliCKy2xAU0VkBjJeqKTezk27Af3waRQhJIojcgeHbtZtJAWEbxvrAexHeeephxkX04TOV20BFVNH4S41f3v7eoMCp59uqvgfwn6INrqry3mSfhhFCkgZOviLyZuvNyj/Zi0yi2+oVwcWnmPDPP05rvlvog0lKzjnepKGwvy8oumyq5J6qRwFNlqorN3s3n4YRQpIE0h9PuMKkeKhE3D32CvbbxRwMK7qFysyrg/ME92pDvP2W7ncECfY4nryhukXiYXsjoYI312kcISQZIOnZszeZ068tWrjGsFwwkCBf0GlHKHnqRuMWgjvH/n4/cMr40ylKHh2hpNduTXNHVQIMXtPvcNsVFrC5kVHe6+M0kBASf+CewWld+O6RjsE2hJUAG8U7dzUnfhEx9M5E/4ghzLaxgfzhJCUvjlNy9UBzIjhs449Nb5SGnFfV0pB9JDJC/clC9gufRhJC4sznz5uUDJip24awkmA1gIFguy2UDOyr5I5LlTw/1uQQmvug+edztyi58zIl552oZM/tTVK5SrijmgrcV8P6mf0Lu7/CALa24jV/m6tCZojTUEJIfMEGJ2bk3bdxjWCQwKivvpqSbp1M3p8++5kqZEi/sFrr+sNOw6IYAXRR9UJAYWsjpwU1rXXjFjuNJYTEE4R8YraNGa9tBNMMBsRnxrguqnBYXLS1kVTOO8+nwYSQuIHZLQ57wcdeDTdLVMF+w0kHKXmrSv5/2NjIav6UVrqRC51GE0LiBU77XnSykjVWc41gmkEKCJyFqE45yIVFGxtpMUkcIfFn1gQlB+/J2f/yoC+wJzHzbre/QqEaSd+aKvXuKrqxX7uNJ4TEAvi2H7lOSbfOrhFMM2uvbgrUIPuo3WfB83XRtsZCucwAnwsghMQB5LcZf5mJdrGNYFppsbKpa4w013Z/hQFsamykprTguQBCYgpO2d51uUneZhvCtNJxHSXXDjIpMez+Cppi3L+2qbFS3uvvXAghJPrABYQwx7Dj/6NK61ZK+u6vZPZ9bl+FQ3+JndTIlSWf+cjnYgghUQcFXE49PPw0C1EDrp/tuyi550pT/czup8DRNhS2NJbKe73dCyKERJ4/Tzfhjpt0cI1imkAKjOFnmMRzdh+FQ2+JtfLZF3wuihASZZB47bUHlBzX27hAbMOYdFDNbO01lJx5lElXbfdPKGjbGXsV5myhL+bf7sURQiINUjM/8hslO29d2TTQUQfx/u218T/pYCWZCdVK+fDvou1MhAreLT4XSAiJOl9MVTL6PCVbbFz9JGxhAOO/7lqm3jEOfCEiyu6TMIDNTIxQtT7v5Z2LJIREn/efVjL8TCWdNzSborbRTAooc7nBukrO7GPST1fL+MNWwmYmSvnMIJ8LJYTEAQwCiINHPeBVWrrGM+7gmjDADetvCr1Ux+3zK9pWJk4IZSpk33MvlhASCz6ZrGTshUq6d1PStrVrROMINntR6WxXfU2jzjEF5u3rDhPYyNiGfTamJdl99UX+4lw0ISQefPWSksdGKjloj+pV5KoUcGfB5XN0TyVPjKpWjp/l+aVoIxOtfPYBnwsnhMQFpEJGTd6TD1WycQclLWMWIYRBC7P+HbdUcvnpSl5/uHrVvVZA28bE62/ZNYWVwwiJNygX+fsnlIw829TnRdhk1KOE4O7BmYbNN1Jy4kGm4M2XVcjt48/iom1MhQreMT4dQAiJG9+8ouSl25UMOdbMqNdqZ6JpbONbbVZtZU41H7q3knEXm03t2mpu9FrAJqZKOW+q0wmEkPiBiJnPnlfy9GglA/uY3Dk4RRuFkFFsViOr6SF7KbnhHOPuwQE3+xqqCWxh6vT9rA30xS91OoMQEk8wEKCU5KQblZxzvJK9dlCy0fpKWq8a3mYxvgez/Q7tlWzXxaSyuP0SJW8+Uq0yjo2xtGgLU6m8N9inQwghcQYDATJnzrlfyY3nKjnmALMqQE791dpUNq0EDD4ylq7RTg826ynZcSslfXsquWagkqlj9crkuWi5elwGS2ql1Eq6A2p8OoUQkhTgHppyszlI1v8QJfvupKRrJ7M6aL+mktXbKmmzqjHkLVuaAQLuo2W0MAe1sJLAAAL3EgYTbOYifv+wfZQM6mtcPNNuVfL5VLcN0aSmaANTrSWzuuiO+KdP5xBCkgQih1BR642HlUy8wawOLuyn5PQjlRzbS8nh2pAftKeSXrsp6dn9f+C/sXmLlcQphyk59wQlvxms5L7hSmbcpeSjZ8xmdFVP7zaZfxZtHyVME0FIGoHBxobsn19W8sU0k3P/42eVfPiMOZFbB/4bp5CRmA4H0Ra+GnW3TgkkMd1Dc8SoIEJIGkhl1E9jWjSrve6c75zOIoSQ5PBd0dZRPjIlJH/26TRCCIk7sG0xL/EYtHKZW306jhBC4g1sG9WI5k9pJTnvfafzCCEkrsCmwbZRJag220132g9OJxJCSPz4oWjTqCao4J3m05GEEBIvYMuoMlTwJjidSQghcQE2jCpT6t1VdCe+6XQqIYREnzeLNoxqhr73NpR8JufTuYQQElG0zYLtoiqg2lk9dKf+5HYyIYREjp+KNouqoPLeMJ+OJoSQqDHMNl9UJZT3Jvl0NiGERIVJttmiKqXa6W11B7/j0+mEEFJt3inaKCpALanpqDt6gU/nE0JItVhQtE1UCMrN3kZYT5gQEg2WFm0SFaLymV6643/0+TEIISQsfizaIqoKymUG+PwghBASDrBBVBWVy4x0fhRCCAka2B4qAsp5Tzo/DiGEBAVsDhURIc92wZvh/EiEEFJpYGuY2z9iWjSvjf5xapwfixBCKkdN0dZQEdSSmnb6B3rL50cjhJDm8lbRxlAR1tKatfQP9YHPj0cIIeXyQdG2UDFQbsZ6+gf7zOdHJISQpvJZ0aZQMVKxjoD3tc+PSQghpfI18/rHVbmZnfQP+K3Pj0oIIY3xbdGGUDFWcRDIfOXz4xJCSD1om0HjnxAZdxD3BAghpfAZ3T5Jk9kYZnQQIaQhPuCGb1JlQkR5ToAQ4sdbDPVMusxhsRqfH58Qkl5qeMgrLcJRbuYOIoQA2AKmd0iZ1LurMIsoISkHNgC2gEqpWE+AkHTCfP5UUYXs6fqG+Mm5QQghSeSn4jNPUctkagyz0DwhyWYpa/hS/srN3kbfIAt8bhpCSPxZUHzGKapeLanpqG+Ut31uHkJIfHm7+GxTVKOqnd5W3zCTfG4iQkj8mFR8pimqScp7w4Sbw4TEFTy7w+zHmqJKV+2sHpLP5HxuLkJIZNHPLJ5dimq2TDbRN92bjBASQd5kNk+qssJpwYI3wedmI4REBTyjPNlLBaaCd5q+0X5wbjxCSDX5ofhsUlTgqs12k5z3vs9NSAgJGzyLeCYpKjTNn9JKcplb9Q34s3NDEkLC4OfiM4hnkaKqorzXW/Odz81JCAkOPHO97ceRosLXolnt9TJ0qs9NSgipNHjW8MxRVKSUzwzSN+g/nRuWEFIJ/ll8xigqsirM2UJYcpKQSlNTfLYoKhbKZ88SppcmpLksLT5LFBU7fT9rA+4NEFImeHbwDFFUrFXwjtE39GLnBieE+LG4+MxQVGL0t+yaein7gL65f/G54QkhxWdDPyN4VigqkVqS3VcK2fd8bn5C0gueCTwbFJV4qZErSz4zUN/4eedBICRd5IvPAp4JikqV/jpjDSl4N+uH4EefB4OQJPNj8d7HM0BRqVbx7ED2BZ+HhJAEou91xvRTlKV8ppd+QD52HxhCEsHHxXucoqh6VNwf8PpLIfuFzwNESPww93J/+vkpqlSpKS0klxmgH5yvnQeKkHjwdfEexr1MUVQZQnk7k1Zioc8DRkgUWVi8Z1makaIqpGIBGu884YliEl0WF+9RFmihqIC0oKa1FLyzuUdAIgPuRdyTuDcpigpBSq2kH74++sGb6zyQhISBuff6FO9FiqKqpFqvu34QJ2v+4zykhFQW3GOTi/ccRVERUm5mJ/1wjhdWJSOVB/fU+OI9RlFUhLWkpp0UMkP0A/u2z4NMSFN4u3gv4Z6iKCpmWuLtJAVvgrA6GSmdpcV7BvcORVEJ0KJ5baSQPV1y3hs+DzwhqMD1RvEewb1CUVRCVZvpKvnMjcJTxqR4D+h7AfcERVEpU21mV73cv0UbggU+xoEkkwXF3xy/PUVRVFH57J6S88ZpA/Gtj9Eg8eZb89vq35iiKKpBFUtXFovVMD11fPm4+Buy1CJFUWXrL3M2KpbtK3hTtFH5u4+hIdHg7+Y30r8VfjOKoqiKStW0lNpZPbSxGS05730fI0TCxPwGo4u/CX4biqKo0LS0Zi094zxKc5MUsq9rY/Qvx0iRSvEv08e6r9Hn6HuKoqjICKmA85k9pOBdog3WNE3Bx5CR0kDfTTN9qfuUaZYpioqd8pnOks/21f+8VnKZ57VRm+9j7NLOfNM3uo9MX3W2u5GiKCoZwmlTxKHnM4M0d2gD6Ek6qp7hGj1zzfra0Qc8eUtRFKWFwuGFOVtoI9n718HhRj0jfkr/95sSj2poaOObps1oO65BXwuuiUXRKYqimqnFmU2kNttNctmeksscXyw8XsiO0IyVgveYZoY2ujVFCt67Yk45/4+C9zfHcJv/Z78Pf1v3OTPMZ+M79HfhO4vfrduAtqBNFBUz/X9y60lzx0OCAQAAAABJRU5ErkJggg==';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }

  class LMSUtils {
    constructor(runtime) {
      this.runtime = runtime;
    }
    getInfo() {
      return {
        id: 'lmsutilsblocks',
        name: 'LMS Utilities',
        color1: '#00e8ba',
        color2: '#00bfa3',
        color3: '#00cca3',
        blockIconURI: blockIconURI,
        blocks: [
          {
            opcode: 'whenBooleanHat',
            blockType: Scratch.BlockType.HAT,
            text: 'when [INPUT]',
            isEdgeActivated: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'whenKeyString',
            blockType: Scratch.BlockType.HAT,
            text: 'when key [KEY_OPTION] pressed',
            isEdgeActivated: true,
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'enter'
              }
            }
          },

          '---',

          {
            opcode: 'trueFalseBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[TRUEFALSE]',
            arguments: {
              TRUEFALSE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'true',
                menu: 'trueFalseMenu'
              }
            }
          },
          {
            opcode: 'isClone',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is clone?',
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'keyStringPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'key [KEY_OPTION] pressed?',
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'enter'
              }
            }
          },
          {
            opcode: 'spriteClicked',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'sprite clicked?',
            filter: [Scratch.TargetType.SPRITE]
          },
          {
            opcode: 'stringIf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'if [BOOLEAN] then [INPUTA]',
            disableMonitor: true,
            arguments: {
              BOOLEAN: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              },
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              }
            }
          },
          {
            opcode: 'stringIfElse',
            blockType: Scratch.BlockType.REPORTER,
            text: 'if [BOOLEAN] then [INPUTA] else [INPUTB]',
            disableMonitor: true,
            arguments: {
              BOOLEAN: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              },
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'banana'
              }
            }
          },

          '---',

          {
            opcode: 'lettersToOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'letters [INPUTA] to [INPUTB] of [STRING]',
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '3'
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'suspicious'
              }
            }
          },
          {
            opcode: 'replaceWords',
            blockType: Scratch.BlockType.REPORTER,
            text: 'replace [INPUTA] with [INPUTB] in [STRING]',
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Scratch'
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Turbowarp'
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Scratch is brilliant!'
              }
            }
          },
          {
            opcode: 'stringToUpperCase',
            blockType: Scratch.BlockType.REPORTER,
            text: '[STRING] to uppercase',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              }
            }
          },
          {
            opcode: 'stringToLowerCase',
            blockType: Scratch.BlockType.REPORTER,
            text: '[STRING] to lowercase',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'APPLE'
              }
            }
          },
          {
            opcode: 'reverseString',
            blockType: Scratch.BlockType.REPORTER,
            text: 'reverse [STRING]',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'prawobrut'
              }
            }
          },

          '---',

          {
            opcode: 'norBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTA] nor [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'xorBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTA] xor [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'xnorBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTA] xnor [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'nandBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTA] nand [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              }
            }
          },

          '---',

          {
            opcode: 'stringReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: '[STRING]',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              }
            }
          },
          {
            opcode: 'colourHex',
            blockType: Scratch.BlockType.REPORTER,
            text: 'color [COLOUR]',
            arguments: {
              COLOUR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#0088ff'
              }
            }
          },
          {
            opcode: 'angleReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'angle [ANGLE]',
            arguments: {
              ANGLE: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: '90'
              }
            }
          },
          {
            opcode: 'matrixReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'matrix [MATRIX]',
            arguments: {
              MATRIX: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: '0101001010000001000101110'
              }
            }
          },
          {
            opcode: 'noteReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'note [NOTE]',
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'newlineCharacter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'newline character',
            disableMonitor: true
          },

          '---',

          {
            opcode: 'equalsExactly',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[ONE] === [TWO]',
            arguments: {
              ONE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              TWO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'banana'
              }
            }
          },
          {
            opcode: 'notEqualTo',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTA] ≠ [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'banana'
              }
            }
          },
          {
            opcode: 'moreThanEqual',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTA] ≥ [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '16'
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '25'
              }
            }
          },
          {
            opcode: 'lessThanEqual',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTA] ≤ [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '16'
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '25'
              }
            }
          },
          {
            opcode: 'stringCheckBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUT] is [DROPDOWN]',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'text',
                menu: 'stringCheckMenu'
              }
            }
          },

          '---',

          {
            opcode: 'encodeToBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: 'encode [STRING] to [DROPDOWN]',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'base64',
                menu: 'conversionMenu'
              }
            }
          },
          {
            opcode: 'decodeFromBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decode [STRING] from [DROPDOWN]',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'base64',
                menu: 'conversionMenu'
              }
            }
          },

          '---',

          {
            opcode: 'exponentBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: '[INPUTA] ^ [INPUTB]',
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'rootBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: '[INPUTA] √ [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              },
              INPUTB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'normaliseValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'normalise [INPUT]',
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '100'
              }
            }
          },

          '---',

          {
            opcode: 'greenFlag',
            blockType: Scratch.BlockType.COMMAND,
            text: 'green flag',
          },
          {
            opcode: 'setUsername',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set username to [INPUT]',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'LukeManiaStudios'
              }
            }
          },

          '---',

          {
            opcode: 'alertBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'alert [STRING]',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'A red spy is in the base!'
              }
            }
          },
          {
            opcode: 'inputPromptBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: 'prompt [STRING]',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'The code is 1, 1, 1.. err... 1!'
              }
            }
          },
          {
            opcode: 'confirmationBlock',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'confirm [STRING]',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Are you the red spy?'
              }
            }
          },

          '---',

          {
            opcode: 'goToLink',
            blockType: Scratch.BlockType.COMMAND,
            text: 'open link [INPUT] in new tab',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'redirectToLink',
            blockType: Scratch.BlockType.COMMAND,
            text: 'redirect to link [INPUT]',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },

          '---',

          {
            opcode: 'setClipboard',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [STRING] to clipboard',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple',
              }
            }
          },
          {
            opcode: 'readClipboard',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clipboard'
          },

          '---',

          {
            opcode: 'screenReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'screen [DROPDOWN]',
            disableMonitor: true,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'width',
                menu: 'screenReporterMenu'
              }
            }
          },
          {
            opcode: 'windowReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'window [DROPDOWN]',
            disableMonitor: true,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'width',
                menu: 'screenReporterMenu'
              }
            }
          },
          {
            opcode: 'osBrowserDetails',
            blockType: Scratch.BlockType.REPORTER,
            text: '[DROPDOWN]',
            disableMonitor: true,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'operating system',
                menu: 'osBrowserMenu'
              }
            }
          },
          {
            opcode: 'projectURL',
            blockType: Scratch.BlockType.REPORTER,
            text: 'project URL',
            disableMonitor: true,
          },

          '---',

          {
            opcode: 'consoleLog',
            blockType: Scratch.BlockType.COMMAND,
            text: 'console [DROPDOWN] [INPUT]',
            disableMonitor: true,
            arguments: {
              DROPDOWN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'log',
                menu: 'consoleLogMenu'
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            }
          },
          {
            opcode: 'clearConsole',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear console'
          },

          '---',

          {
            opcode: 'commentHat',
            blockType: Scratch.BlockType.HAT,
            text: '// [STRING]',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment',
              }
            }
          },
          {
            opcode: 'commentCommand',
            blockType: Scratch.BlockType.COMMAND,
            text: '// [STRING]',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment',
              }
            }
          },
          {
            opcode: 'commentString',
            blockType: Scratch.BlockType.REPORTER,
            text: '// [INPUTA] [INPUTB]',
            disableMonitor: true,
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'input'
              }
            }
          },
          {
            opcode: 'commentBool',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '// [INPUTA] [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
              }
            }
          }
        ],
        menus: {
          conversionMenu: {
            acceptReporters: true,
            items: [
              {
                text: 'base64',
                value: 'base64'
              },
              {
                text: 'binary',
                value: 'binary'
              }
            ]
          },
          trueFalseMenu: {
            acceptReporters: true,
            items: [
              {
                text: 'true',
                value: 'true'
              },
              {
                text: 'false',
                value: 'false'
              },
              {
                text: 'random',
                value: 'random',
              }
            ]
          },
          screenReporterMenu: {
            acceptReporters: true,
            items: [
              {
                text: 'width',
                value: 'width'
              },
              {
                text: 'height',
                value: 'height'
              }
            ]
          },
          windowReporterMenu: {
            acceptReporters: true,
            items: [
              {
                text: 'width',
                value: 'width'
              },
              {
                text: 'height',
                value: 'height'
              }
            ]
          },
          stringCheckMenu: {
            acceptReporters: true,
            items: [
              {
                text: 'text',
                value: 'text'
              },
              {
                text: 'number',
                value: 'number'
              },
              {
                text: 'uppercase',
                value: 'uppercase'
              },
              {
                text: 'lowercase',
                value: 'lowercase'
              }
            ]
          },
          osBrowserMenu: {
            acceptReporters: true,
            items: [
              {
                text: 'operating system',
                value: 'operating system'
              },
              {
                text: 'browser',
                value: 'browser'
              }
            ]
          },
          consoleLogMenu: {
            acceptReporters: false,
            items: [
              {
                text: 'log',
                value: 'log'
              },
              {
                text: 'error',
                value: 'error'
              },
              {
                text: 'warn',
                value: 'warn'
              }
            ]
          },
        }
      };
    }

    whenBooleanHat(args) {
      return args.INPUT;
    }

    whenKeyString(args, util) {
      return util.ioQuery('keyboard', 'getKeyIsDown', [args.KEY_OPTION]);
    }

    spriteClicked(util) {
      if ((util.target.isTouchingObject('_mouse_')) && (util.ioQuery('mouse', 'getMouseDown'))) {
        return true;
      } else {
        return false;
      }
    }

    equalsExactly(args) {
      return args.ONE === args.TWO;
    }

    stringReporter(args) {
      return args.STRING;
    }

    colourHex(args) {
      return args.COLOUR;
    }

    angleReporter(args) {
      return args.ANGLE;
    }

    matrixReporter(args) {
      return args.MATRIX;
    }

    noteReporter(args) {
      return args.NOTE;
    }

    newlineCharacter() {
      return '\n';
    }

    stringIf(args) {
      if (args.BOOLEAN) {
        return args.INPUTA;
      } else {
        return '';
      }
    }

    stringIfElse(args) {
      if (args.BOOLEAN) {
        return args.INPUTA;
      } else {
        return args.INPUTB;
      }
    }

    lettersToOf(args) {
      var string = args.STRING.toString();
      var input1 = args.INPUTA - 1;
      var input2 = args.INPUTB;
      return string.slice(input1, input2);
    }

    replaceWords(args) {
      var input1 = args.INPUTA;
      var input2 = args.INPUTB;
      var string = args.STRING;
      return string.replace(input1, input2);
    }

    exponentBlock(args) {
      return Math.pow(args.INPUTA, args.INPUTB);
    }

    rootBlock(args) {
      return Math.pow(args.INPUTB, 1 / args.INPUTA);
    }

    normaliseValue(args) {
      var input1 = args.INPUT;
      var input2 = Math.abs(input1);
      var output = (input1 / input2);
      if (isNaN(output)) {
        return '0';
      } else {
        return output;
      }
    }

    stringToUpperCase(args) {
      return args.STRING.toUpperCase();
    }

    stringToLowerCase(args) {
      return args.STRING.toLowerCase();
    }

    reverseString(args) {
      var input = args.STRING;
      var splitInput = input.split('');
      var reversedInput = splitInput.reverse();
      var joinedArray = reversedInput.join('');
      return joinedArray;
    }

    encodeToBlock(args) {
      if (args.STRING === ''); {
        return '';
      }
      if (args.DROPDOWN === 'base64') {
        return btoa(args.STRING);
      }
      if (args.DROPDOWN === 'binary') {
        return args.STRING.split('').map(function (char) {
          return char.charCodeAt(0).toString(2);
        }).join(' ');
      }
    }

    decodeFromBlock(args) {
      if (args.STRING === ''); {
        return '';
      }
      if (args.DROPDOWN === 'base64') {
         return atob(args.STRING);
      }
      if (args.DROPDOWN === 'binary') {
         var output = args.STRING.toString();
         return output.split(' ').map((x) => x = String.fromCharCode(parseInt(x, 2))).join('');
      }
    }

    trueFalseBoolean(args) {
      if (args.TRUEFALSE === 'random') {
        var min = 1;
        var max = 2;
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        if (random == '2') {
          return true;
        } else {
          return false;
        }
      }
      if (args.TRUEFALSE === 'true') {
        return true;
      }
      if (args.TRUEFALSE === 'false') {
        return false;
      }
    }

    isClone(args, util) {
      if (util.target.isOriginal) {
        return false;
      } else {
        return true;
      }
    }

    keyStringPressed(args, util) {
      return util.ioQuery('keyboard', 'getKeyIsDown', [args.KEY_OPTION]);
    }

    spriteClicked(args, util) {
      return (util.ioQuery('mouse', 'getIsDown') && util.target.isTouchingObject('_mouse_'));
    }

    notEqualTo(args) {
      return (args.INPUTA != args.INPUTB);
    }

    moreThanEqual(args) {
      return (args.INPUTA >= args.INPUTB);
    }

    lessThanEqual(args) {
      return (args.INPUTA <= args.INPUTB);
    }

    stringCheckBoolean(args) {
      var input = args.INPUT;
      if (args.DROPDOWN === 'text') {
        return isNaN(args.INPUT);
      }
      if (args.DROPDOWN === 'number') {
        return !isNaN(args.INPUT);
      }
      if (args.DROPDOWN === 'uppercase') {
        return (args.INPUT == args.INPUT.toUpperCase());
      }
      if (args.DROPDOWN === 'lowercase') {
        return (args.INPUT == args.INPUT.toLowerCase());
      }
    }

    norBoolean(args) {
      return !(args.INPUTA || args.INPUTB);
    }

    xorBoolean(args) {
      return (args.INPUTA !== args.INPUTB);
    }

    xnorBoolean(args) {
      return (args.INPUTA === args.INPUTB);
    }

    nandBoolean(args) {
      return !(args.INPUTA && args.INPUTB);
    }

    screenReporter(args) {
      if (args.DROPDOWN === 'width') {
        return screen.width;
      }
      if (args.DROPDOWN === 'height') {
        return screen.height;
      }
    }

    windowReporter(args) {
      if (args.DROPDOWN === 'width') {
        return window.innerWidth;
      }
      if (args.DROPDOWN === 'height') {
        return window.innerHeight;
      }
    }

    osBrowserDetails(args) {
      var user = navigator.userAgent;
      if (args.DROPDOWN === 'operating system') {
        if (user.includes('Mac OS')) {
          return 'macOS';
        }
        if (user.includes('CrOS')) {
          return 'ChromeOS';
        }
        if (user.includes('Linux')) {
          return 'Linux';
        }
        if (user.includes('Windows')) {
          return 'Windows';
        }
        if (user.includes('iPad')) {
          return 'iOS';
        }
        if (user.includes('iPod')) {
          return 'iOS';
        }
        if (user.includes('iPhone')) {
          return 'iOS';
        }
        if (user.includes('Android')) {
          return 'Android';
        }
        return 'Other';
      }
      if (args.DROPDOWN === 'browser') {
        if (user.includes('Chrome')) {
          return 'Chrome';
        }
        if (user.includes('MSIE')) {
          return 'Internet Explorer';
        }
        if (user.includes('rv:')) {
          return 'Internet Explorer';
        }
        if (user.includes('Firefox')) {
          return 'Firefox';
        }
        if (user.includes('Safari')) {
          return 'Safari';
        }
        return 'Other';
      }
    }

    projectURL() {
      return window.location.href;
    }

    goToLink(args) {
      Scratch.openWindow(args.INPUT);
    }

    redirectToLink(args) {
      Scratch.redirect(args.INPUT);
    }

    greenFlag(args, util) {
      util.runtime.greenFlag();
    }

    setUsername(args, util) {
      util.runtime.ioDevices.userData._username = args.INPUT;
    }

    consoleLog(args) {
      if (args.DROPDOWN === 'log') {
        console.log(args.INPUT);
      } else if (args.DROPDOWN === 'error') {
        console.error(args.INPUT);
      } else if (args.DROPDOWN === 'warn') {
        console.warn(args.INPUT);
      }
    }

    clearConsole() {
      console.clear();
    }

    setClipboard(args) {
      navigator.clipboard.writeText(args.STRING);
    }

    readClipboard(args) {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return navigator.clipboard.readText();
      }
      return '';
    }

    alertBlock(args) {
      alert(args.STRING);
    }

    inputPromptBlock(args) {
      return prompt(args.STRING);
    }

    confirmationBlock(args) {
      if (confirm(args.STRING)) {
        return true;
      } else {
        return false;
      }
    }

    commentHat(args, util) {
      return args.INPUT;
    }

    commentCommand(args) {
    }

    commentString(args) {
      return args.INPUTB;
    }

    commentBool(args) {
      return args.INPUTB;
    }
  }
  Scratch.extensions.register(new LMSUtils());
})(Scratch);
