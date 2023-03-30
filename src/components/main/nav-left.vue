<template>
	<div class="case_nav_container" style="color: white; ">
		<el-menu :unique-opened="true" class="el-menu-vertical-demo" background-color="white" border="0px">
			<template v-for="(item,index) of navdata">
				<el-submenu v-if="item.children" :index="index.toString()" :key="index">
					<template slot="title">
						<i v-if="item.code =='M001'" class="el-icon-s-cooperation" style="margin-right: 3px"></i>
						<i v-else-if="item.code =='M002'" class="el-icon-s-custom" style="margin-right: 3px"></i>
						<i v-else-if="item.code =='M003'" class="el-icon-office-building" style="margin-right: 3px"></i>
						<i v-else-if="item.code =='M004'" class="el-icon-s-shop" style="margin-right: 3px"></i>
						<i v-else-if="item.code =='M005'" class="el-icon-s-platform" style="margin-right: 3px"></i>
						<i v-else-if="item.code =='M006'" class="el-icon-s-release" style="margin-right: 3px"></i>
						{{item.title}}
					</template>
					<el-menu-item-group>
						<template v-for="(item1,index1) of item.children">
							<el-menu-item :index="index+'-'+index1" @click="itemDeal(item1,index )" :class="{selected:selected===index}">
								<i v-if="item1.code =='M00101'" class="el-icon-s-cooperation" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00102'" class="el-icon-user-solid" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00103'" class="el-icon-s-operation" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00201'" class="el-icon-user" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00202'" class="el-icon-star-on" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00203'" class="el-icon-eleme" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00204'" class="el-icon-warning" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00301'" class="el-icon-house" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00401'" class="el-icon-shopping-cart-1" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00402'" class="el-icon-user" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00501'" class="el-icon-s-check" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00502'" class="el-icon-s-check" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00601'" class="el-icon-warning" style="margin-right: 3px"></i>
								<i v-else-if="item1.code =='M00602'" class="el-icon-film" style="margin-right: 3px"></i>
								<span slot="title" style="margin-right:10px; font-size:14px;">{{item1.title}}</span>
							</el-menu-item>
						</template>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item v-else :index="index.toString()" :key="index" @click="itemDeal(item)">
					<span slot="title">{{item.title}}</span>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: "navleft",
		props: {
			navdata: Array
		},
		data() {
			return {
				isCollapse: true,
				selected: 0
			}
		},
		methods: {
			itemDeal: function(item, index) {
				this.selected = index
				this.$router.push(item.path)
			},
		}
	}
</script>
<style>
	.el-menu {
		border: 0px;
	}
</style>
